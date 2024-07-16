import { Injectable } from '@angular/core';
import { SimulatorService } from '../simulator/simulator.service';
import { OrderTableListItem } from '../Models/order-table.models';
import { Observable, of } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(private simulator: SimulatorService) {}
  createOrUpdateOrder(
    order: OrderTableListItem
  ): Observable<OrderTableListItem> {
    return this.simulator.createOrUpdateOrder(order);
  }
}
