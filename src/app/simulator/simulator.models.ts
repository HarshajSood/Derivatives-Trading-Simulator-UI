import { CurrencyCode } from '../Models/assets.models';
import { CurrencyPair } from '../Models/underlying.models';

export interface StockDatabaseAsset {
  symbol: string;
  averagePrice: number;
  spread: number;
  changeSpread: number;
  averageVolume: number;
  volumeSpread: number;
}

export interface ForexDatabaseAsset {
  currencyPair: CurrencyPair;
  averageStrike: number; //assuming always terms per base
  spread: number;
  changeSpread: number;
}

export const StockDatabase: StockDatabaseAsset[] = [
  {
    symbol: 'NVDA',
    averagePrice: 130.23,
    spread: 10,
    changeSpread: 0.14,
    averageVolume: 80000,
    volumeSpread: 10000,
  },
  {
    symbol: 'APPL',
    averagePrice: 205.49,
    spread: 5,
    changeSpread: 0.05,
    averageVolume: 40000,
    volumeSpread: 5000,
  },
  {
    symbol: 'GOOG',
    averagePrice: 187.89,
    spread: 5,
    changeSpread: 0.05,
    averageVolume: 40000,
    volumeSpread: 5000,
  },
  {
    symbol: 'TSLA',
    averagePrice: 252.6,
    spread: 20,
    changeSpread: 0.05,
    averageVolume: 40000,
    volumeSpread: 5000,
  },
  {
    symbol: 'AMZN',
    averagePrice: 194.32,
    spread: 5,
    changeSpread: 0.05,
    averageVolume: 40000,
    volumeSpread: 5000,
  },
  {
    symbol: 'META',
    averagePrice: 493.94,
    spread: 7.8,
    changeSpread: 0.09,
    averageVolume: 40000,
    volumeSpread: 5000,
  },
  {
    symbol: 'MSFT',
    averagePrice: 449.93,
    spread: 10,
    changeSpread: 0.09,
    averageVolume: 40000,
    volumeSpread: 5000,
  },
];

export const ForexDatabase: ForexDatabaseAsset[] = [
  {
    currencyPair: {
      baseCurrencyId: CurrencyCode.EUR,
      termsCurrencyId: CurrencyCode.USD,
    },
    averageStrike: 1.07,
    changeSpread: 0.0009,
    spread: 0.006,
  },
  {
    currencyPair: {
      baseCurrencyId: CurrencyCode.EUR,
      termsCurrencyId: CurrencyCode.GBP,
    },
    averageStrike: 0.853,
    changeSpread: 0.0005,
    spread: 0.004,
  },
  {
    currencyPair: {
      baseCurrencyId: CurrencyCode.GBP,
      termsCurrencyId: CurrencyCode.USD,
    },
    averageStrike: 1.285,
    changeSpread: 0.0009,
    spread: 0.007,
  },
  {
    currencyPair: {
      baseCurrencyId: CurrencyCode.USD,
      termsCurrencyId: CurrencyCode.JPY,
    },
    averageStrike: 156.28,
    changeSpread: 0.0009,
    spread: 0.007,
  },
  {
    currencyPair: {
      baseCurrencyId: CurrencyCode.AUD,
      termsCurrencyId: CurrencyCode.USD,
    },
    averageStrike: 0.67,
    changeSpread: 0.0028,
    spread: 0.017,
  },
  {
    currencyPair: {
      baseCurrencyId: CurrencyCode.USD,
      termsCurrencyId: CurrencyCode.CAD,
    },
    averageStrike: 1.37,
    changeSpread: 0.0006,
    spread: 0.002,
  },
  {
    currencyPair: {
      baseCurrencyId: CurrencyCode.USD,
      termsCurrencyId: CurrencyCode.CHF,
    },
    averageStrike: 0.90,
    changeSpread: 0.0009,
    spread: 0.0021,
  },
  {
    currencyPair: {
      baseCurrencyId: CurrencyCode.GBP,
      termsCurrencyId: CurrencyCode.JPY,
    },
    averageStrike: 205.38,
    changeSpread: 0.00025,
    spread: 0.002,
  },
];
