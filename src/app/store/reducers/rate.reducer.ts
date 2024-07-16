import { RateState, initialRateState } from '../state/rate.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as RateActions from 'src/app/store/actions/rate.actions';
import { newStateWithAction } from '../functions.store';

const rateReducer = createReducer(
  initialRateState,
  on(RateActions.StockQuoteResponse, (state, payload) =>
    newStateWithAction(state, (s) => {
      s.tickerQuotes[payload.stockAssetQuote.ticker.symbol] =
        payload.stockAssetQuote;
      if (s.stockIntraday[payload.stockAssetQuote.ticker.symbol] != undefined) {
        s.stockIntraday[payload.stockAssetQuote.ticker.symbol].push(
          payload.stockAssetQuote
        );
      } else {
        s.stockIntraday[payload.stockAssetQuote.ticker.symbol] = [
          payload.stockAssetQuote,
        ];
      }
    })
  ),
  on(RateActions.ForexQuoteResponse, (state, payload) =>
    newStateWithAction(
      state,
      (s) =>
        (s.forexTickerQuotes[
          payload.forexAssetQuote.ticker.baseCurrencyId +
            payload.forexAssetQuote.ticker.termsCurrencyId
        ] = payload.forexAssetQuote)
    )
  ),
  on(RateActions.SetSelectedInstrument, (state, payload) =>
    newStateWithAction(
      state,
      (s) => (s.selectedInstrument = payload.instrument)
    )
  )
);

export function rateDataReducer(
  rateState: RateState | undefined,
  action: Action
): RateState {
  return rateReducer(rateState, action);
}
