import { BuySell, TradeType } from '../Models/trade-ticket.models';
import {
  CurrencyPair,
  StockTicker,
  UnderlyingAssetType,
} from '../Models/underlying.models';
import { SelectedInstrument } from '../store/state/rate.state';

export interface OrderTableListItem {
  id: string;
  instrumentType: UnderlyingAssetType;
  instrument: SelectedInstrument;
  tradeType: TradeType;
  buySell: BuySell;
  quantity: number;
  price: number;
  profit: number | null;
  limit: number | null;
  trailingStop: number | null;
  tradeTime: Date;
}
