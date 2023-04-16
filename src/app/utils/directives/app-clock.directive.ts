import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appClock]',
})
export class ClockDirective implements OnInit, OnDestroy {
  private intervalId: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.updateTime();
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 60000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  private updateTime() {
    const now = new Date();
    let hour = now.getHours() % 12;
    hour = hour ? hour : 12;
    const minutes = now.getMinutes();
    const amPm = now.getHours() < 12 ? 'AM' : 'PM';
    this.elementRef.nativeElement.innerText = `${hour}:${
      minutes < 10 ? '0' + minutes : minutes
    } ${amPm}`;
  }
}
