import { Component, Input } from '@angular/core';
import { Current, Forecastday, Location } from '../../models/weather.model';

@Component({
  selector: 'app-weather-day-detail',
  templateUrl: './weather-day-detail.component.html',
})
export class WeatherDayDetailComponent {
  @Input() current: Current | undefined;
  @Input() selectedDay: Forecastday | undefined;
  @Input() location: Location | undefined;
}
