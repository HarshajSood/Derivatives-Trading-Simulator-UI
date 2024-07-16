import { OrdersState } from './orders.state';
import { RateState } from './rate.state';

export interface AppState {
  ratesState: RateState;
  ordersState: OrdersState;
}
