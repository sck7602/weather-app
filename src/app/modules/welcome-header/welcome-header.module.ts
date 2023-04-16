import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClockDirective } from '../../utils/directives/app-clock.directive';
import { SessionDirective } from '../../utils/directives/app-session.directive';
import { WelcomeHeaderComponent } from './welcome-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WelcomeHeaderComponent, ClockDirective, SessionDirective],
  exports: [WelcomeHeaderComponent],
})
export class WelcomeHeaderModule {}
