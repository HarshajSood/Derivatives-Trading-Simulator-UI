import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, delay, of } from 'rxjs';
import { CurrencyCode } from 'src/app/Models/assets.models';
import {
  ForexAssetQuote,
  CurrencyPair,
  StockAssetQuote,
} from 'src/app/Models/underlying.models';
import { UnderlyingService } from 'src/app/Services/underlying.service';
import {
  ForexQuoteRequest,
  SetSelectedInstrument,
  StockQuoteRequest,
} from 'src/app/store/actions/rate.actions';
import {
  $forexTickerRate,
  $tickerRate,
} from 'src/app/store/selectors/rate.selector';
import { AppState } from 'src/app/store/state/app-state';

@Component({
  selector: 'rate-ticker',
  templateUrl: 'rate.component.html',
})
export class RateTickerComponent {
  @Input() tickerSymbol: string | null = null;
  @Input() currencyPair: CurrencyPair | null = null;
  Stock$: Observable<StockAssetQuote> | null = null;
  Forex$: Observable<ForexAssetQuote> | null = null;
  constructor(
    private ratesService: UnderlyingService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    if (this.tickerSymbol != null) {
      this.store.dispatch(
        StockQuoteRequest({ stockTicker: { symbol: this.tickerSymbol } })
      );
      this.Stock$ = $tickerRate(this.store, this.tickerSymbol);
    } else if (this.currencyPair != null) {
      this.store.dispatch(
        ForexQuoteRequest({ forexTicker: this.currencyPair })
      );
      this.Forex$ = $forexTickerRate(this.store, this.currencyPair);
    }
  }
  ngOnChanges() {}

  getCurrencyString(ticker: CurrencyPair): string {
    return (
      CurrencyCode[ticker.baseCurrencyId] + CurrencyCode[ticker.termsCurrencyId]
    );
  }

  getClass(change: number): string {
    return change > 0
      ? 'arrow_drop_up'
      : change < 0
      ? 'arrow_drop_down'
      : 'nochange';
  }

  setSelectedStock(stock: StockAssetQuote): void {
    this.store.dispatch(
      SetSelectedInstrument({
        instrument: {
          forex: null,
          stock: stock.ticker,
        },
      })
    );
  }

  setSelectedForex(forex: ForexAssetQuote): void {
    this.store.dispatch(
      SetSelectedInstrument({
        instrument: {
          stock: null,
          forex: forex.ticker,
        },
      })
    );
  }
}
