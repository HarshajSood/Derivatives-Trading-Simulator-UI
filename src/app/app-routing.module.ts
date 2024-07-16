import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RateTickerComponent } from './components/Rates/rate.component';
import { RatesDashboardComponent } from './components/rates-dashboard/rate-dashboard.component';

const routes: Routes = [{ path: '', component: RatesDashboardComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
