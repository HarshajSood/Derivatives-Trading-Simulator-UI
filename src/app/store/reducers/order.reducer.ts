import { Action, createReducer, on } from '@ngrx/store';
import { OrdersState, initialOrderState } from '../state/orders.state';
import * as OrderActions from 'src/app/store/actions/orders.actions';
import { newStateWithAction } from '../functions.store';

const orderReducer = createReducer(
  initialOrderState,
  on(OrderActions.OrderCreationResponse, (state, payload) =>
    newStateWithAction(state, (s) => s.ordersList.push(payload.order))
  )
);

export function orderDataReducer(
  orderState: OrdersState | undefined,
  action: Action
): OrdersState {
  return orderReducer(orderState, action);
}
