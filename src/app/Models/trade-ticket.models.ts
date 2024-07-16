import { CurrencyPair, UnderlyingAssetType } from '../Models/underlying.models';

export enum DerivativeType {
  Basic = 1,
  Option = 2,
}

export enum TradeType {
  Market = 1,
  Limit = 2,
  Stop = 3,
  TrailingStop = 4,
  StopLimit = 5,
}

export enum BuySell {
  Buy = 1,
  Sell = 2,
}

export enum PutCall {
  Put = 1,
  Call = 2,
}

export enum OptionLegType {
  SingleLeg = 1,
  MultiLeg = 2,
}

export enum OptionExerciseStyle {
  European = 1,
  American = 2,
}

export interface BaseTradeModel {
  instrumentType: UnderlyingAssetType;
  ticker: string | CurrencyPair;
  tradeType: TradeType;
  buySell: BuySell;
  amount: number; // number of shares for Stock
  rate: number; //cost of single share for Stock
  trailingStop: number | null;
  limitRate: number | null;
}

export interface StockTradeModel extends BaseTradeModel {
  ticker: string;
}

export interface ForexTradeModel extends BaseTradeModel {
  ticker: CurrencyPair;
}
