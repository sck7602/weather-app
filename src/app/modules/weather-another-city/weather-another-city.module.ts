import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WeatherAnotherCityComponent } from './weather-another-city.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WeatherAnotherCityComponent],
  exports: [WeatherAnotherCityComponent],
})
export class WeatherAnotherCityModule {}
