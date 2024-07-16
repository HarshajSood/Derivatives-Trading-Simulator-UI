import { DataSource } from '@angular/cdk/table';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, of } from 'rxjs';
import { CurrencyCode } from 'src/app/Models/assets.models';
import { OrderTableListItem } from 'src/app/Models/order-table.models';
import { BuySell, TradeType } from 'src/app/Models/trade-ticket.models';
import {
  CurrencyPair,
  StockTicker,
  UnderlyingAssetType,
} from 'src/app/Models/underlying.models';
import { $OrderList } from 'src/app/store/selectors/rate.selector';
import { AppState } from 'src/app/store/state/app-state';
import { SelectedInstrument } from 'src/app/store/state/rate.state';

@Component({
  selector: 'order-table',
  templateUrl: './order-table.component.html',
})
export class OrderTableComponent {
  displayedColumns: string[] = [
    'tradeDate',
    'instrumentType',
    'instrument',
    'tradeType',
    'buySell',
    'quantity',
    'price',
    'limit',
    'trailingStop',
  ];
  dataSource$: Observable<OrderTableListItem[]> = of([]);
  readonly dataSource = new OrderTableDataSource([]);

  constructor(private store: Store<AppState>) {
    $OrderList(this.store).subscribe((x) => {
      this.dataSource.setData(x);
    });
  }

  getTradeTypeString(enumval: TradeType) {
    return TradeType[enumval];
  }
  getBuySellString(enumval: BuySell) {
    return BuySell[enumval];
  }

  getInstrumentString(enumval: UnderlyingAssetType) {
    return UnderlyingAssetType[enumval];
  }

  getElementString(
    element: SelectedInstrument,
    assetType: UnderlyingAssetType
  ): string {
    switch (assetType) {
      case UnderlyingAssetType.Stock:
        return element!.stock!.symbol;
      case UnderlyingAssetType.Forex:
        return (
          CurrencyCode[element!.forex!.baseCurrencyId] +
          CurrencyCode[element!.forex!.termsCurrencyId]
        );
      default:
        return '???';
    }
  }
}

class OrderTableDataSource extends DataSource<OrderTableListItem> {
  private _dataStream = new ReplaySubject<OrderTableListItem[]>();

  constructor(initialData: OrderTableListItem[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<OrderTableListItem[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: OrderTableListItem[]) {
    this._dataStream.next(data);
  }
}
