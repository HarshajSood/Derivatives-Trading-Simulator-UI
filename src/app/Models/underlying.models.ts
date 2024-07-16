import { CurrencyCode } from '../Models/assets.models';

export enum UnderlyingAssetType {
  None = 0,
  Custom = 1,
  Stock = 2,
  Forex = 3,
  Bond = 4,
}

export enum TimeSeriesType {
  Intraday = 1,
  Day = 2,
  Weekly = 3,
  Monthly = 4,
  Quarterly = 5,
  Yearly = 6,
  Max = 7,
}
export interface BaseAssetQuote {
  price: number;
  change: number;
  quoteTime: Date;
}
export interface CurrencyPair {
  baseCurrencyId: CurrencyCode;
  termsCurrencyId: CurrencyCode;
}
export interface StockTicker {
  symbol: string;
}
export interface StockAssetQuote extends BaseAssetQuote {
  ticker: StockTicker;
  volume: number;
}
export interface ForexAssetQuote extends BaseAssetQuote {
  ticker: CurrencyPair;
}

export interface BaseAssetTimeSeries {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  time: Date;
}

export interface BaseAssetTimeSeries {
  timeSeriesData: BaseAssetTimeSeries[];
  timeSeriesType: TimeSeriesType;
}

export interface BaseUnderlyingAsset {
  timeSeries?: BaseAssetTimeSeries;
}

export interface StockAsset extends BaseUnderlyingAsset {
  ticker: StockTicker;
}

export interface ForexAsset extends BaseUnderlyingAsset {
  ticker: CurrencyPair;
}
export interface UnderlyingAsset {
  assetType: UnderlyingAssetType;
  stock?: StockAsset;
  forex?: ForexAsset;
}
