import { createAction, props } from '@ngrx/store';
import {
  ForexAssetQuote,
  CurrencyPair,
  StockAssetQuote,
  StockTicker,
} from 'src/app/Models/underlying.models';
import { SelectedInstrument } from '../state/rate.state';

export const StockQuoteRequest = createAction(
  'Stock Quote Request',
  props<{ stockTicker: StockTicker }>()
);
export const StockQuoteResponse = createAction(
  'Stock Quote Response',
  props<{ stockAssetQuote: StockAssetQuote }>()
);

export const ForexQuoteRequest = createAction(
  'Forex Quote Request',
  props<{ forexTicker: CurrencyPair }>()
);
export const ForexQuoteResponse = createAction(
  'Forex Quote Response',
  props<{ forexAssetQuote: ForexAssetQuote }>()
);
export const ResponseError = createAction(
  'Response Error',
  props<{ err: string }>()
);

export const SetSelectedInstrument = createAction(
  'Set Selected Instrument',
  props<{ instrument: SelectedInstrument }>()
);
