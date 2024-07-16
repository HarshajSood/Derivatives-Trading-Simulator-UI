import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnderlyingService } from './Services/underlying.service';
import { SimulatorService } from './simulator/simulator.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RateTickerComponent } from './components/Rates/rate.component';
import { RatesDashboardComponent } from './components/rates-dashboard/rate-dashboard.component';
import { RootStoreModule } from './store/root-store.module';
import { TradeFormComponent } from './components/trade-form/trade-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BaseSelectComponent } from './components/FormComponents/TradeTypeSelect/base.select';
import { MatButtonModule } from '@angular/material/button';
import { OrdersService } from './Services/orders.service';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { MatTableModule } from '@angular/material/table';
import { RegexNumberService } from './Services/regex-number.service';
import { InstrumentChartComponent } from './components/instrument-chart/instrument-chart.component';
import { MatInputModule } from '@angular/material/input';
import { BaseChartDirective } from 'ng2-charts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@NgModule({
  declarations: [
    AppComponent,
    RateTickerComponent,
    RatesDashboardComponent,
    TradeFormComponent,
    BaseSelectComponent,
    OrderTableComponent,
    InstrumentChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RootStoreModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    BaseChartDirective,
    MatTabsModule,
    MatSliderModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  providers: [
    SimulatorService,
    UnderlyingService,
    OrdersService,
    RegexNumberService,
    DatePipe,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
