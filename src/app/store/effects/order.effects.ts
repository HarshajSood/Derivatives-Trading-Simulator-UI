import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, pipe, switchMap } from 'rxjs';
import { OrdersService } from 'src/app/Services/orders.service';
import * as orderActions from 'src/app/store/actions/orders.actions';

@Injectable()
export class OrderEffects {
  constructor(
    private ordersService: OrdersService,
    private actions$: Actions
  ) {}

  placeNewOrder = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.TradeOrderRequest),
      switchMap((actionPayload) => {
        const result = this.ordersService
          .createOrUpdateOrder(actionPayload.order)
          .pipe(
            map((result) =>
              orderActions.OrderCreationResponse({ order: result })
            ),
            catchError((error) =>
              of(orderActions.OrderCreationError({ err: error }))
            )
          );
        return result;
      })
    )
  );
}
