import { Injectable } from '@angular/core';
import { UnderlyingService } from 'src/app/Services/underlying.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as rateActions from 'src/app/store/actions/rate.actions';
import { catchError, map, mergeMap, of, switchMap, concatMap } from 'rxjs';

@Injectable()
export class RateEffects {
  constructor(
    private ratesService: UnderlyingService,
    private actions$: Actions
  ) {}

  getStockRateForTicker = createEffect(() =>
    this.actions$.pipe(
      ofType(rateActions.StockQuoteRequest),
      mergeMap((actionPayload) => {
        const result = this.ratesService
          .getLiveStockQuote(actionPayload.stockTicker)
          .pipe(
            map((result) =>
              rateActions.StockQuoteResponse({ stockAssetQuote: result })
            ),
            catchError((error) => of(rateActions.ResponseError({ err: error })))
          );
        return result;
      })
    )
  );

  getForexRateForTicker = createEffect(() =>
    this.actions$.pipe(
      ofType(rateActions.ForexQuoteRequest),
      mergeMap((actionPayload) => {
        const result = this.ratesService
          .getLiveForexQuote(actionPayload.forexTicker)
          .pipe(
            map((result) =>
              rateActions.ForexQuoteResponse({ forexAssetQuote: result })
            ),
            catchError((error) => of(rateActions.ResponseError({ err: error })))
          );
        return result;
      })
    )
  );
}
