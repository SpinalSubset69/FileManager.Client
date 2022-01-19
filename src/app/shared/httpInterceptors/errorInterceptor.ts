import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/services/toasts.service';

@Injectable()
export class errorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toasts:ToastsService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          //CLIENT SIDE ERRORS
        } else {

          //SERVER SIDE ERRORS
          if (error.message.includes('Http failure')) {
            localStorage.clear();
            this.router.navigateByUrl('/auth/home/login')
            errorMsg = "Cant't connect to the server";
            this.toasts.ErrorToastr('Cant\'t connect to the server' ,'Server');
          } else {
            errorMsg = error.message;
          }
        }
        return throwError(errorMsg);
      })
    );
  }
}
