import { OrderTableListItem } from 'src/app/Models/order-table.models';
import { BuySell, TradeType } from 'src/app/Models/trade-ticket.models';
import { UnderlyingAssetType } from 'src/app/Models/underlying.models';

export interface OrdersState {
  ordersList: OrderTableListItem[];
}

export const initialOrderState: OrdersState = {
  ordersList: [
    {
      id: '123232323',
      instrumentType: UnderlyingAssetType.Stock,
      instrument: { stock: { symbol: 'NVDA' }, forex: null },
      tradeType: TradeType.Market,
      buySell: BuySell.Buy,
      quantity: 10,
      price: 129.23,
      limit: null,
      trailingStop: null,
      profit: null,
      tradeTime: new Date(),
    },
  ],
};
