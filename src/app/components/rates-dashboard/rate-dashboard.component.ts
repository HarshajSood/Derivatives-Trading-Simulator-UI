import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { filter, Observable } from 'rxjs';
import { CurrencyCode } from 'src/app/Models/assets.models';
import {
  BaseAssetQuote,
  CurrencyPair,
  StockAssetQuote,
} from 'src/app/Models/underlying.models';
import {
  $SelectedInstrument,
  $SelectedInstrumentLiveStockRate,
} from 'src/app/store/selectors/rate.selector';
import { AppState } from 'src/app/store/state/app-state';
import { SelectedInstrument } from 'src/app/store/state/rate.state';

@Component({
  selector: 'rate-dashboard',
  templateUrl: './rate-dashboard.component.html',
})
export class RatesDashboardComponent {
  stockTickers: string[] = ['GOOG', 'NVDA', 'APPL', 'TSLA', 'AMD', 'META', 'AMZN', 'MSFT', 'NFLX'];
  filteredTickers = this.stockTickers;
  barChartType: ChartType = 'bar';
  stockSearch = new FormControl('');
  forexSearch = new FormControl('');
  currencyPairs: CurrencyPair[] = [
    { baseCurrencyId: CurrencyCode.EUR, termsCurrencyId: CurrencyCode.USD },
    { baseCurrencyId: CurrencyCode.EUR, termsCurrencyId: CurrencyCode.GBP },
    { baseCurrencyId: CurrencyCode.GBP, termsCurrencyId: CurrencyCode.USD },
    { baseCurrencyId: CurrencyCode.USD, termsCurrencyId: CurrencyCode.JPY },
    { baseCurrencyId: CurrencyCode.AUD, termsCurrencyId: CurrencyCode.USD },
    { baseCurrencyId: CurrencyCode.USD, termsCurrencyId: CurrencyCode.CAD },
    { baseCurrencyId: CurrencyCode.USD, termsCurrencyId: CurrencyCode.CHF },
    { baseCurrencyId: CurrencyCode.GBP, termsCurrencyId: CurrencyCode.JPY },
  ];
  filteredCurrencyPairs = this.currencyPairs;
  liveStockRate$: Observable<BaseAssetQuote | null>;
  selectedInstrument$: Observable<SelectedInstrument>;

  constructor(private store: Store<AppState>) {
    this.liveStockRate$ = $SelectedInstrumentLiveStockRate(this.store);
    this.selectedInstrument$ = $SelectedInstrument(this.store);
    this.stockSearch.valueChanges.subscribe((x) => this.filterRates(x));
    this.forexSearch.valueChanges.subscribe((x) => this.filterCurrencies(x));
  }

  filterRates(search: string | null) {
    if (search == null || search == '' || search == undefined) {
      this.filteredTickers = this.stockTickers;
    } else {
      this.filteredTickers = this.stockTickers.filter((x) =>
        x.toLowerCase().includes(search.toLowerCase())
      );
    }
  }
  filterCurrencies(search: string | null) {
    if (search == null || search == '' || search == undefined) {
      this.filteredCurrencyPairs = this.currencyPairs;
    } else {
      this.filteredCurrencyPairs = this.currencyPairs.filter((cp) =>
        (CurrencyCode[cp.baseCurrencyId] + CurrencyCode[cp.termsCurrencyId])
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }
  }
}
