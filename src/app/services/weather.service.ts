import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WEATHER_URL } from '../config/weather.config';
import { LocationWeather } from '../models/current-weather.model';
import { Weather } from '../models/weather.model';
import { environment } from '../../environments/environment';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(
    latitude: string,
    longitude: string,
    cityName = '',
    days = 10,
    aqi = 'no',
    alert = 'no'
  ): Observable<Weather> {
    const location = this.searchLocation(latitude, longitude, cityName);
    return this.http.get<Weather>(
      `${WEATHER_URL}/v1/forecast.json?key=${environment.API_KEY}&q=${location}&days=${days}&aqi=${aqi}&alerts=${alert}`
    );
  }

  getLocationWeather(cityName = '', aqi = 'no'): Observable<LocationWeather> {
    return this.http.get<LocationWeather>(
      `https://api.weatherapi.com/v1/current.json?key=${environment.API_KEY}&q=${cityName}&aqi=${aqi}`
    );
  }

  private searchLocation(
    latitude: string,
    longitude: string,
    cityName = ''
  ): string {
    let searchLocation = '';
    if (!latitude && !longitude) {
      searchLocation = 'Ha Noi';
    } else {
      searchLocation = `${latitude},${longitude}`;
    }

    if (cityName) {
      searchLocation = cityName;
    }

    return searchLocation;
  }
}
