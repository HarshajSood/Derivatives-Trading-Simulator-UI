import { Injectable } from '@angular/core';
import {
  BaseAssetQuote,
  ForexAssetQuote,
  CurrencyPair,
  StockAssetQuote,
  StockTicker,
} from '../Models/underlying.models';
import { Observable, delay, of } from 'rxjs';
import { SimulatorService } from '../simulator/simulator.service';

@Injectable()
export class UnderlyingService {
  constructor(private simulator: SimulatorService) {}
  getLiveStockQuote(ticker: StockTicker): Observable<StockAssetQuote> {
    return this.simulator.getStockQuoteObservable(ticker);
  }

  getLiveForexQuote(ticker: CurrencyPair): Observable<ForexAssetQuote> {
    return this.simulator.getForexQuoteObservable(ticker);
  }
}
