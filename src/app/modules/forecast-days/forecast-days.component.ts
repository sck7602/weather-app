import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Forecastday } from '../../models/weather.model';

@Component({
  selector: 'app-forecast-days',
  templateUrl: './forecast-days.component.html',
})
export class ForecastDaysComponent {
  @Input() darkTheme = true;
  @Input() forecastday: Forecastday[] | undefined;
  @Output() selectDay = new EventEmitter<number>();

  selectedDays = 5;
  indexDay = 0;

  onSelectedDays(event: any): void {
    this.selectedDays = event.target.value;
  }

  onSelect(index: number): void {
    this.indexDay = index;
    this.selectDay.emit(index);
  }
}
