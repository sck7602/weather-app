import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForecastDaysComponent } from './forecast-days.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ForecastDaysComponent],
  exports: [ForecastDaysComponent],
})
export class ForecastDaysModule {}
