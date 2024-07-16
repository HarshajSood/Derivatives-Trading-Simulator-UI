import { createAction, props } from '@ngrx/store';
import { OrderTableListItem } from 'src/app/Models/order-table.models';

export const TradeOrderRequest = createAction(
  'Trade Order Request',
  props<{ order: OrderTableListItem }>()
);
export const OrderCreationResponse = createAction(
  'Order Creation Response',
  props<{ order: OrderTableListItem }>()
);
export const OrderCreationError = createAction(
  'Order Creation Error',
  props<{ err: string }>()
);
