import {
  CurrencyPair,
  ForexAssetQuote,
  StockAssetQuote,
  StockTicker,
} from 'src/app/Models/underlying.models';

export interface RateState {
  tickerQuotes: stockTickerQuotes;
  forexTickerQuotes: forexTickerQuotes;
  selectedInstrument: SelectedInstrument;
  stockIntraday: stockTickerIntraday;
}
export interface stockTickerQuotes {
  [ticker: string]: StockAssetQuote;
}
export interface forexTickerQuotes {
  [currencyPair: string]: ForexAssetQuote;
}

export interface stockTickerIntraday {
  [ticker: string]: StockAssetQuote[];
}

export interface SelectedInstrument {
  forex: CurrencyPair | null;
  stock: StockTicker | null;
}

export const initialRateState: RateState = {
  tickerQuotes: {},
  forexTickerQuotes: {},
  stockIntraday: {},
  selectedInstrument: { stock: { symbol: 'NVDA' }, forex: null },
};
