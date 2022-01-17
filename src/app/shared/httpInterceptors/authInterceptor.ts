import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuhtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if(!token){
      return  next.handle(req);
    }

    const headers = req.clone({
      headers: req.headers.set('Authorization', `bearer ${token}`)
    })

    return next.handle(headers);
  }
}
