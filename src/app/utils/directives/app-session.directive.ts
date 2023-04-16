import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appSession]',
})
export class SessionDirective implements OnInit, OnDestroy {
  private intervalId: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.updateSession();
    this.intervalId = setInterval(() => {
      this.updateSession();
    }, 60000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  private updateSession() {
    const now = new Date();
    const hour = now.getHours();

    let session;
    if (hour < 12) {
      session = 'morning';
    } else if (hour >= 12 && hour < 18) {
      session = 'afternoon';
    } else {
      session = 'evening';
    }

    this.elementRef.nativeElement.innerText = `Good ${session}!`;
  }
}
