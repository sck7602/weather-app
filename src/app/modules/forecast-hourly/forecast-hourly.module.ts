import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { ForecastHourlyComponent } from './forecast-hourly.component';
@NgModule({
  imports: [CommonModule, HighchartsChartModule],
  declarations: [ForecastHourlyComponent],
  exports: [ForecastHourlyComponent],
})
export class ForecastHourlyModule {}
