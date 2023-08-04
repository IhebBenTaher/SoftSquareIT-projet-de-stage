import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req=request;
    if(window.localStorage.getItem('token')){
      req=request.clone({
        setHeaders:{
          authorization:"Bearer "+window.localStorage.getItem('token')
        }
      })
    }
    return next.handle(req);
  }
}
