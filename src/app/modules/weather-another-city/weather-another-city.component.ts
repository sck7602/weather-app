import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, finalize, forkJoin, takeUntil } from 'rxjs';
import { LocationWeather } from '../../models/current-weather.model';
import { DestroyService } from '../../services/destroy.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-another-city',
  templateUrl: './weather-another-city.component.html',
})
export class WeatherAnotherCityComponent implements OnInit {
  @Output() selectedCity = new EventEmitter<string>();

  isLoading = true;
  citys: LocationWeather[] = [];

  constructor(
    private weatherService: WeatherService,
    private destroyService: DestroyService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getLocationWeather();
  }

  selectedCities(city = 'Ha Noi') {
    this.selectedCity.emit(city);
  }

  private getLocationWeather(
    cityNameFirst = 'Ho Chi Minh',
    cityNameSecond = 'Da Nang'
  ): void {
    forkJoin({
      reqFirst: this.weatherObs(cityNameFirst),
      reqSecond: this.weatherObs(cityNameSecond),
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cd.detectChanges();
        }),
        takeUntil(this.destroyService)
      )
      .subscribe({
        next: ({ reqFirst, reqSecond }) => {
          this.citys = [reqFirst, reqSecond];
          console.log(this.citys);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private weatherObs(cityName = ''): Observable<LocationWeather> {
    return this.weatherService.getLocationWeather(cityName);
  }
}
