import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AppState } from './state/app-state';
import { EffectsModule } from '@ngrx/effects';
import { rateDataReducer } from './reducers/rate.reducer';
import { RateEffects } from './effects/rate.effects';
import { OrderEffects } from './effects/order.effects';
import { orderDataReducer } from './reducers/order.reducer';
const actionReducerMap: ActionReducerMap<AppState> = {
  ratesState: rateDataReducer,
  ordersState: orderDataReducer,
};
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(actionReducerMap, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot([RateEffects, OrderEffects]),
  ],
})
export class RootStoreModule {}
