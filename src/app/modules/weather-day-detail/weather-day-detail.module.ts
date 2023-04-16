import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WeatherDayDetailComponent } from './weather-day-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WeatherDayDetailComponent],
  exports: [WeatherDayDetailComponent],
})
export class WeatherDayDetailModule {}
