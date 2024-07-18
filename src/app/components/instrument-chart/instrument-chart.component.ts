import {
  Component,
  Input,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js/auto';
import { AppState } from 'src/app/store/state/app-state';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { SelectedInstrument } from 'src/app/store/state/rate.state';
import { BaseAssetQuote } from 'src/app/Models/underlying.models';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TradeFormComponent } from '../trade-form/trade-form.component';
import { CurrencyCode } from 'src/app/Models/assets.models';
@Component({
  selector: 'instrument-chart',
  templateUrl: './instrument-chart.component.html',
})
export class InstrumentChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() chartType: ChartType = 'line';
  @Input() selectedInstrument: SelectedInstrument | null = null;
  @Input() liveStockRate: BaseAssetQuote | null = null;
  isStock: boolean = true;
  minRange: number | null = null;
  maxRange: number | null = null;
  rangePercent: number = 0;
  readonly dialog = inject(MatDialog);

  emptyChartData: ChartData = {
    datasets: [{ data: [], label: '' }],
    labels: [],
  };
  chartData: ChartData = this.emptyChartData;

  constructor(private store: Store<AppState>, private datepipe: DatePipe) {
    Chart.register(Annotation);
  }

  clearChart(x: SelectedInstrument) {
    this.chartData.datasets[0].data = [];
    this.chartData.labels = [];
    this.minRange = null;
    this.maxRange = null;
    this.rangePercent = 0;
    this.chart?.update();
  }
  updateStockChart(intradayQuotes: BaseAssetQuote | null) {
    if (intradayQuotes) {
      const quote = intradayQuotes;
      if (this.chartData.datasets[0].data.length == 25) {
        this.chartData.datasets[0].data.shift();
        this.chartData.labels!.shift();
      }
      this.chartData.datasets[0].data.push(quote.price);
      this.chartData.datasets[0].borderColor = '#3967BE';
      this.chartData.datasets[0].label = 'Price';
      this.chartData.labels!.push(
        this.datepipe.transform(quote.quoteTime, 'hh:mm:ss a')
      );
      this.minRange =
        this.minRange == null
          ? quote.price
          : this.minRange < quote.price
          ? this.minRange
          : quote.price;
      this.maxRange =
        this.maxRange == null
          ? quote.price
          : this.maxRange > quote.price
          ? this.maxRange
          : quote.price;
      const range = this.maxRange - this.minRange;
      this.rangePercent =
        range == 0 ? 0 : ((quote.price - this.minRange) * 100) / range;
    }
    this.chart?.update();
    //this.chart?.update();
  }
  /*updateStockChart(intradayQuotes: BaseAssetQuote | null) {
    if (intradayQuotes) {
      const quote = intradayQuotes;
      this.chartData.datasets[0].data.push(quote.price);
      this.chartData.datasets[0].borderColor = '#3967BE';
      this.chartData.datasets[0].label = 'Price';
      this.chartData.labels!.push(
        this.datepipe.transform(quote.quoteTime, 'hh:mm:ss a')
      );
      this.minRange =
        this.minRange == null
          ? quote.price
          : this.minRange < quote.price
          ? this.minRange
          : quote.price;
      this.maxRange =
        this.maxRange == null
          ? quote.price
          : this.maxRange > quote.price
          ? this.maxRange
          : quote.price;
      const range = this.maxRange - this.minRange;
      this.rangePercent =
        range == 0 ? 0 : ((quote.price - this.minRange) * 100) / range;
    }
    this.chart?.update();
    //this.chart?.update();
  }*/

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedInstrument'] && this.selectedInstrument)
      this.clearChart(this.selectedInstrument);
    this.updateChart();
  }

  updateChart() {
    if (this.liveStockRate) this.updateStockChart(this.liveStockRate);
    //this.chart?.update();
  }
  getTickerString(selectedInstrument: SelectedInstrument | null): string {
    if (!selectedInstrument) return '???';
    return selectedInstrument.stock != null
      ? selectedInstrument.stock.symbol
      : selectedInstrument.forex != null
      ? CurrencyCode[selectedInstrument.forex.baseCurrencyId] +
        CurrencyCode[selectedInstrument.forex.termsCurrencyId]
      : '???';
  }

  OpenTradeTicket() {
    let dialogRef = this.dialog.open(TradeFormComponent, {
      data: {
        ticker: this.getTickerString(this.selectedInstrument),
        price: this.liveStockRate?.price ?? 0,
      },
    });
  }

  @Input() chartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 2,
      },
      line: {
        tension: 0,
        backgroundColor: '#3967BE',
        borderColor: '#3967BE',
        borderWidth: 3,
      },
    },
    color: '#293cb8',
    scales: {
      x: {
        display: true,
        grid: {
          drawTicks: true,
          drawOnChartArea: true,
          color: '#444444',
        },
        ticks: {
          display: true,
          color: '#ffffff',
          autoSkip:true
        },
        border: {
          display: true,
        },
      },
      y: {
        display: true,
        grid: {
          drawTicks: true,
          drawOnChartArea: true,
          color: '#444444',
        },
        ticks: {
          display: true,
          color: '#ffffff',
        },
        border: {
          display: true,
        },
      },
    },
  };
}
