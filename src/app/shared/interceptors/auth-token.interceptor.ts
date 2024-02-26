import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, from, switchMap } from 'rxjs';

@Injectable()
export class AuthToken implements HttpInterceptor {
  constructor(private authSvc: Auth) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('skipAuth')) {
      req = req.clone({
        headers: req.headers.delete('skipAuth'),
      });
      return next.handle(req);
    }
    if (this.authSvc.currentUser) {
      return from(this.authSvc.currentUser.getIdToken()).pipe(
        switchMap((token) => {
          if (token) {
            req = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`),
            });
            return next.handle(req);
          }
          return next.handle(req);
        })
      );
    }
    return next.handle(req);
  }
}
