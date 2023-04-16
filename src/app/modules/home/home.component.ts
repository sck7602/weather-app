import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  finalize,
  interval,
  takeUntil,
} from 'rxjs';
import { Forecastday, Weather } from '../../models/weather.model';
import { DestroyService } from '../../services/destroy.service';
import { ForecastDaysModule } from '../forecast-days/forecast-days.module';
import { ForecastHourlyModule } from '../forecast-hourly/forecast-hourly.module';
import { WeatherAnotherCityModule } from '../weather-another-city/weather-another-city.module';
import { WeatherDayDetailModule } from '../weather-day-detail/weather-day-detail.module';
import { WelcomeHeaderModule } from '../welcome-header/welcome-header.module';
import { WeatherService } from './../../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ForecastDaysModule,
    ForecastHourlyModule,
    WeatherAnotherCityModule,
    WeatherDayDetailModule,
    WelcomeHeaderModule,
  ],
  providers: [WeatherService, DestroyService],
})
export class HomeComponent implements OnInit {
  latitude = '';
  longitude = '';
  isLoading = true;
  isFirstLoad = true;
  weather!: Weather;
  selectedDay!: Forecastday;
  selectedIndex = 0;
  darkTheme = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private weatherService: WeatherService,
    private destroyService: DestroyService,
    private cd: ChangeDetectorRef
  ) {
    this.getTheme();
    this.detectLocation();
  }

  ngOnInit(): void {
    this.getWeather();

    interval(600000)
      .pipe(takeUntil(this.destroyService))
      .subscribe(() => {
        this.getWeather();
      });
  }

  changeTheme(status: boolean): void {
    this.darkTheme = status;
    localStorage.setItem('THEME', this.darkTheme ? 'DARK' : 'LIGHT');
    this.cd.detectChanges();
  }

  onSelectCity(city: string) {
    this.isLoading = true;
    this.getWeather(city);
  }

  onSearchCity(event: any): void {
    const textSearch = event.target.value.trim();

    if (textSearch) {
      this.isLoading = true;
      this.cd.detectChanges();
      this.weatherObs(textSearch)
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          finalize(() => {
            this.isLoading = false;
            this.cd.detectChanges();
          }),
          takeUntil(this.destroyService)
        )
        .subscribe({
          next: (res) => {
            event.target.value = '';
            this.handleResponse(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  onSelectDay(index: number): void {
    if (this.weather?.forecast?.forecastday) {
      this.selectedIndex = index;
      this.selectedDay = this.weather.forecast.forecastday[index];
    }
  }

  detectLocation(isClick = false): void {
    if (!isClick) {
      const locationString = localStorage.getItem('location');
      if (locationString) {
        const location = JSON.parse(locationString);
        if (location) {
          this.latitude = location.latitude;
          this.longitude = location.longitude;
        }
        return;
      }
    }

    if (isPlatformBrowser(this.platformId)) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = String(position.coords.latitude);
          this.longitude = String(position.coords.longitude);

          if (isClick) {
            this.isLoading = true;
            this.getWeather();
          }

          localStorage.setItem(
            'location',
            JSON.stringify({
              latitude: this.latitude,
              longitude: this.longitude,
            })
          );
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }
  }

  private getWeather(cityName = ''): void {
    this.weatherObs(cityName)
      .pipe(
        finalize(() => {
          this.isFirstLoad = false;
          this.isLoading = false;
          this.cd.detectChanges();
        }),
        takeUntil(this.destroyService)
      )
      .subscribe({
        next: (res) => {
          this.handleResponse(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private weatherObs(cityName = ''): Observable<Weather> {
    return this.weatherService.getWeather(
      this.latitude,
      this.longitude,
      cityName
    );
  }

  private handleResponse(res: Weather): void {
    if (res) {
      this.weather = res;
      if (this.weather.location) {
        localStorage.setItem(
          'location',
          JSON.stringify({
            latitude: this.weather.location.lat,
            longitude: this.weather.location.lon,
          })
        );
      }
      console.log(this.weather);
    }
  }

  private getTheme(): void {
    const themeLocal = localStorage.getItem('THEME');
    const currentTheme = this.darkTheme ? 'DARK' : 'LIGHT';

    if (themeLocal && themeLocal !== currentTheme) {
      this.darkTheme = themeLocal === 'DARK' ? true : false;
    }
  }
}
