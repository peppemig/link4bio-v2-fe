import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class GlobalHttpErrorHandler implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('skipError')) {
      req = req.clone({
        headers: req.headers.delete('skipError'),
      });
      return next.handle(req);
    }
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        this.snackBar.open('Ops! Qualcosa è andato storto', 'Chiudi');
        return throwError(() => err);
      })
    );
  }
}
