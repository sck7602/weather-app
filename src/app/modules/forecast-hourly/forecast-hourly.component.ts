import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Forecastday, Location } from '../../models/weather.model';

@Component({
  selector: 'app-forecast-hourly',
  templateUrl: './forecast-hourly.component.html',
})
export class ForecastHourlyComponent {
  @Input()
  set darkTheme(val: boolean) {
    this.isDarkTheme = val;
    this.setOptionChart();
  }

  @Input()
  set forecastday(days: Forecastday[] | undefined) {
    this.forecastdays = days || [];
    this.getTemperatureRange(days);
    this.setOptionChart();
  }

  @Input()
  set selectedIndex(index: number) {
    if (index || index === 0) {
      this.getTemperatureRange(this.forecastdays, index);
      this.setOptionChart();
    }
  }

  @Input() location: Location | undefined;

  highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  isDarkTheme = true;
  forecastdays: Forecastday[] = [];
  temperatureRange: number[] = [];

  private getTemperatureRange(
    days: Forecastday[] | undefined,
    indexSelected = 0
  ): void {
    this.temperatureRange = [];
    days?.forEach((day, index) => {
      if (index === indexSelected) {
        day.hour?.forEach((hrs) => {
          this.temperatureRange.push(hrs.temp_c!);
        });
      }
    });
  }

  private setOptionChart(): void {
    this.chartOptions = {
      chart: {
        type: 'spline',
        backgroundColor: this.isDarkTheme ? '#3b3b73' : '#fff',
        borderRadius: 20,
      },
      title: {
        text: 'Hourly Average Temperature',
        style: {
          color: this.isDarkTheme ? '#fff' : '#000',
        },
      },
      xAxis: {
        categories: [
          '01 AM',
          '02 AM',
          '03 AM',
          '04 AM',
          '05 AM',
          '06 AM',
          '07 AM',
          '08 AM',
          '09 AM',
          '10 AM',
          '11 AM',
          '12 AM',
          '01 PM',
          '02 PM',
          '03 PM',
          '04 PM',
          '05 PM',
          '06 PM',
          '07 PM',
          '08 PM',
          '09 PM',
          '10 PM',
          '11 PM',
          '12 PM',
        ],
      },
      yAxis: {
        title: {
          text: 'Temperature °C',
          style: {
            color: this.isDarkTheme ? '#fff' : '#000',
          },
        },
      },
      tooltip: {
        valueSuffix: ' °C',
      },
      plotOptions: {
        spline: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: this.location?.name,
          data: this.temperatureRange,
        },
      ],
    } as Highcharts.Options;
  }
}
