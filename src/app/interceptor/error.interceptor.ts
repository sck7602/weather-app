import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          switch (err.status) {
            case 400:
              this.toastr.error('Bad request');
              break;
            case 401:
              this.toastr.error('Unauthorized');
              break;
            case 404:
              this.toastr.error('Not found');
              break;
            case 500:
              this.toastr.error('Internal server error');
              break;
            default:
              this.toastr.error('Something wrong');
              break;
          }
        }

        throw err;
      })
    );
  }
}
