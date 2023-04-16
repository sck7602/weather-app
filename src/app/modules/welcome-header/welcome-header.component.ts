import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-welcome-header',
  templateUrl: './welcome-header.component.html',
})
export class WelcomeHeaderComponent {
  @Input() darkTheme = true;
  @Output() changeTheme = new EventEmitter<boolean>();
  currentDay = new Date();

  changeDarkTheme(status: boolean): void {
    this.darkTheme = status;
    this.changeTheme.emit(status);
  }
}
