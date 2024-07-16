import { Component, Inject, OnChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormSelectItem } from 'src/app/Models/shared.models';
import { BuySell, TradeType } from 'src/app/Models/trade-ticket.models';
import {
  PositiveAmountValidator,
  positiveRateValidator,
} from '../FormComponents/validators';
import { GuidGenerator, emptyGuid } from 'src/app/store/functions.store';
import { OrderTableListItem } from 'src/app/Models/order-table.models';
import { AppState } from 'src/app/store/state/app-state';
import { Store } from '@ngrx/store';
import { TradeOrderRequest } from 'src/app/store/actions/orders.actions';
import {
  CurrencyPair,
  StockTicker,
  UnderlyingAssetType,
} from 'src/app/Models/underlying.models';
import { Observable, of } from 'rxjs';
import { $SelectedInstrument } from 'src/app/store/selectors/rate.selector';
import { SelectedInstrument } from 'src/app/store/state/rate.state';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'trade-form',
  templateUrl: 'trade-form.component.html',
})
export class TradeFormComponent implements OnChanges {
  basicTradeForm!: FormGroup;
  testInput: boolean = false;
  selectedInstrument$: Observable<SelectedInstrument | null> = of(null);
  tradeItems: FormSelectItem[] = [
    {
      id: TradeType.Market,
      text: 'Market',
    },
    {
      id: TradeType.Stop,
      text: 'Stop',
    },
    {
      id: TradeType.Limit,
      text: 'Limit',
    },
    {
      id: TradeType.StopLimit,
      text: 'Stop Limit',
    },
    {
      id: TradeType.TrailingStop,
      text: 'Trailing Stop',
    },
  ];

  buySellItems: FormSelectItem[] = [
    {
      id: BuySell.Buy,
      text: 'Buy',
    },
    {
      id: BuySell.Sell,
      text: 'Sell',
    },
  ];
  constructor(
    private formbuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: { ticker: string; price: number }
  ) {
    this.selectedInstrument$ = $SelectedInstrument(this.store);
    this.createForm();
  }

  ngOnChanges() {}

  createForm() {
    this.basicTradeForm = this.formbuilder.group({
      TradeType: [TradeType.Market],
      BuySell: [BuySell.Buy],
      Amount: [null, [PositiveAmountValidator, Validators.required]],
      Strike: [null],
      Limit: [null, positiveRateValidator],
      TrailingStop: [null, positiveRateValidator],
    });
    this.basicTradeForm.get('Strike')?.setValue(this.data.price);
    this.basicTradeForm.get('Strike')?.disable();
    this.basicTradeForm
      .get('TradeType')
      ?.valueChanges.subscribe((x) => this.updateStrikeValidity(x));
  }

  updateStrikeValidity(tradeType: TradeType) {
    if (tradeType == TradeType.Market || tradeType == TradeType.Stop)
      this.basicTradeForm.get('Strike')?.disable();
    else this.basicTradeForm.get('Strike')?.enable();
  }
  get isFormValid(): boolean {
    return this.basicTradeForm.valid;
  }

  get showTrailingStop(): boolean {
    var tradeType = this.basicTradeForm.get('TradeType')?.value as TradeType;
    return tradeType == TradeType.TrailingStop;
  }
  get showStop(): boolean {
    var tradeType = this.basicTradeForm.get('TradeType')?.value as TradeType;
    return tradeType == TradeType.Stop || tradeType == TradeType.StopLimit;
  }

  get priceEnabled(): boolean {
    var tradeType = this.basicTradeForm.get('TradeType')?.value as TradeType;
    return !(tradeType == TradeType.Market || tradeType == TradeType.Stop);
  }
  DispatchOrderCreation() {
    let neworder: OrderTableListItem = {
      id: emptyGuid,
      instrument: { stock: null, forex: null },
      tradeType: this.basicTradeForm.get('TradeType')?.value as TradeType,
      buySell: this.basicTradeForm.get('BuySell')?.value as BuySell,
      quantity: this.basicTradeForm.get('Amount')?.value as number,
      price: this.basicTradeForm.get('Strike')?.value as number,
      instrumentType: UnderlyingAssetType.None,
      limit: null,
      trailingStop: null,
      profit: null,
      tradeTime: new Date(),
    };
    this.selectedInstrument$.subscribe((x) => {
      if (x != null) {
        neworder.instrument = x;
        neworder.instrumentType =
          x == null
            ? UnderlyingAssetType.None
            : x.forex != null
            ? UnderlyingAssetType.Forex
            : x.stock != null
            ? UnderlyingAssetType.Stock
            : UnderlyingAssetType.Custom;
      }
    });

    this.store.dispatch(TradeOrderRequest({ order: neworder }));

    this.testInput = true;
    console.log(GuidGenerator());
  }
}
