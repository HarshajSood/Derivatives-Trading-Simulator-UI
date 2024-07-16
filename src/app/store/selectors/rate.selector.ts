import { Store } from '@ngrx/store';
import { AppState } from '../state/app-state';
import {
  BaseAssetQuote,
  CurrencyPair,
  ForexAssetQuote,
  StockAssetQuote,
  StockTicker,
  UnderlyingAssetType,
} from 'src/app/Models/underlying.models';
import {
  Observable,
  combineLatest,
  concatAll,
  distinct,
  distinctUntilChanged,
  last,
  map,
  switchMap,
} from 'rxjs';
import { SelectedInstrument } from '../state/rate.state';
import { distinctUntilValueChanged } from '../functions.store';
import { OrderTableListItem } from 'src/app/Models/order-table.models';
import { CurrencyCode } from 'src/app/Models/assets.models';
export const $tickerRate = (
  store: Store<AppState>,
  ticker: string
): Observable<StockAssetQuote> => {
  let rate = store.select((s) => s.ratesState.tickerQuotes[ticker]);
  return rate;
};

export const $forexTickerRate = (
  store: Store<AppState>,
  ticker: CurrencyPair
): Observable<ForexAssetQuote> => {
  let rate = store.select(
    (s) =>
      s.ratesState.forexTickerQuotes[
        CurrencyCode[ticker.baseCurrencyId] + CurrencyCode[ticker.termsCurrencyId]
      ]
  );
  return rate;
};

export const $SelectedInstrument = (
  store: Store<AppState>
): Observable<SelectedInstrument> => {
  let instrument = store
    .select((s) => s.ratesState.selectedInstrument)
    .pipe(distinctUntilValueChanged);
  return instrument;
};

export const $SelectedInstrumentLiveStockRate = (
  store: Store<AppState>
): Observable<BaseAssetQuote | null> => {
  let instrument = store
    .select((s) => {
      if (s.ratesState.selectedInstrument.stock)
        return s.ratesState.tickerQuotes[
          s.ratesState.selectedInstrument.stock.symbol
        ];
      else if (s.ratesState.selectedInstrument.forex)
        return s.ratesState.forexTickerQuotes[
          CurrencyCode[s.ratesState.selectedInstrument.forex!.baseCurrencyId] +
            CurrencyCode[s.ratesState.selectedInstrument.forex!.termsCurrencyId]
        ];
      else return null;
    })
    .pipe(distinctUntilValueChanged);
  return instrument;
};

export const $OrderList = (
  store: Store<AppState>
): Observable<OrderTableListItem[]> => {
  let list = store.select((s) => s.ordersState.ordersList);

  /*let newOrderList = combineLatest(store.select(s=>s.ordersState.ordersList), store.select(s=>s.ratesState.forexTickerQuotes), store.select(s=>s.ratesState.tickerQuotes)).pipe(map(y=>{
    y[0].forEach((x) => {
      if (x.instrumentType == UnderlyingAssetType.Forex) {
        let currentRate =
          y[1][
            x.instrument.forex!.baseCurrencyId +
              x.instrument.forex!.termsCurrencyId
          ].price;
        x.profit = (currentRate - x.price) * x.quantity;
      } else if (x.instrumentType == UnderlyingAssetType.Stock) {
        let currentRate =
          y[2][x.instrument.stock!.symbol].price;
        x.profit = (currentRate - x.price) * x.quantity;
      }
    });
    return y[0];
  }));*/
  return list;
};
