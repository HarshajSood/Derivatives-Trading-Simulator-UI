import { Injectable } from '@angular/core';
import {
  ForexAssetQuote,
  CurrencyPair,
  StockAssetQuote,
  StockTicker,
} from '../Models/underlying.models';
import { ForexDatabase, StockDatabase } from './simulator.models';
import { Observable, of } from 'rxjs';
import { CurrencyCode } from '../Models/assets.models';
import { OrderTableListItem } from '../Models/order-table.models';
import { GuidGenerator, emptyGuid } from '../store/functions.store';
import { cloneDeep } from 'lodash-es';

@Injectable()
export class SimulatorService {
  createOrUpdateOrder(
    order: OrderTableListItem
  ): Observable<OrderTableListItem> {
    if (order.id == emptyGuid) return of(this.createNewOrder(order));
    else throw new Error('Cannot currently Update Orders');
  }

  private createNewOrder(order: OrderTableListItem): OrderTableListItem {
    const newOrder = cloneDeep(order);
    newOrder.id = GuidGenerator();
    return newOrder;
  }

  getStockQuoteObservable(ticker: StockTicker): Observable<StockAssetQuote> {
    return new Observable(function subscribe(subscriber) {
      var previousQuote: StockAssetQuote | null = null;
      setInterval(() => {
        const currentValue = getStockQuote(ticker, previousQuote);
        subscriber.next(currentValue);
        previousQuote = currentValue;
      }, 1000);
    });
  }

  getForexQuoteObservable(ticker: CurrencyPair): Observable<ForexAssetQuote> {
    return new Observable(function subscribe(subscriber) {
      var previousQuote: ForexAssetQuote | null = null;
      setInterval(() => {
        const currentValue = getForexQuote(ticker, previousQuote);
        subscriber.next(currentValue);
        previousQuote = currentValue;
      }, 1000);
    });
  }
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomValue(
  price: number,
  spread: number,
  scaleDownFactor: number,
  isInteger: boolean
) {
  var value =
    price +
    scaleDownFactor * randomIntFromInterval(spread * -500, spread * 500);
  return isInteger ? Math.floor(value) : value;
}

function Clamp(
  previous: number,
  current: number,
  changeSpread: number
): number {
  if (current > previous)
    return current > previous + changeSpread
      ? previous + changeSpread
      : current;
  else if (current <= previous)
    return current < previous - changeSpread
      ? previous - changeSpread
      : current;

  return current;
}

export function getStockQuote(
  ticker: StockTicker,
  previousQuote: StockAssetQuote | null
): StockAssetQuote {
  var requestedStock = StockDatabase.find((x) => x.symbol == ticker.symbol);
  var result: StockAssetQuote = {
    ticker: { symbol: 'NA' },
    price: 0,
    volume: 0,
    change: 0,
    quoteTime: new Date(),
  };
  if (requestedStock == undefined) {
    return result;
  }
  const currentPrice =
    previousQuote == null
      ? getRandomValue(
          requestedStock.averagePrice,
          requestedStock.spread,
          0.0001,
          false
        )
      : Clamp(
          getRandomValue(
            requestedStock.averagePrice,
            requestedStock.spread,
            0.0001,
            false
          ),
          previousQuote.price,
          requestedStock.changeSpread
        );
  result = {
    ticker: { symbol: requestedStock.symbol },
    price: currentPrice,
    volume: getRandomValue(
      requestedStock.averageVolume,
      requestedStock.volumeSpread,
      0.01,
      true
    ),
    change: previousQuote != null ? currentPrice - previousQuote.price : 0,
    quoteTime: new Date(),
  };

  return result;
}

export function getForexQuote(
  currencyPair: CurrencyPair,
  previousForexQuote: ForexAssetQuote | null
): ForexAssetQuote {
  var requestedForex = ForexDatabase.find(
    (x) =>
      x.currencyPair.baseCurrencyId == currencyPair.baseCurrencyId &&
      x.currencyPair.termsCurrencyId == currencyPair.termsCurrencyId
  );
  var result: ForexAssetQuote = {
    ticker: {
      baseCurrencyId: CurrencyCode.Unknown,
      termsCurrencyId: CurrencyCode.Unknown,
    },
    price: 0,
    change: 0,
    quoteTime: new Date(),
  };
  if (requestedForex == undefined) {
    return result;
  }
  const currentPrice =
    previousForexQuote == null
      ? getRandomValue(
          requestedForex.averageStrike,
          requestedForex.spread,
          0.001,
          false
        )
      : Clamp(
          getRandomValue(
            requestedForex.averageStrike,
            requestedForex.spread,
            0.001,
            false
          ),
          previousForexQuote.price,
          requestedForex.changeSpread
        );
  result.ticker = requestedForex.currencyPair;
  result.price = currentPrice;
  result.change =
    previousForexQuote != null ? currentPrice - previousForexQuote.price : 0;
  result.quoteTime = new Date();
  return result;
}
