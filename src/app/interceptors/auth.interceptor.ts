import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            // token expired or invalid — clear storage and redirect to login
            this.auth.logout();
            // Use window.location to force a full app reload and ensure the login page renders
            // after auth state is cleared. NavController cannot be injected here reliably
            // across every Angular lifecycle, so use location change as a robust fallback.
            window.location.href = '/login';
          }
          return throwError(() => err);
        })
      );
    }
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.auth.logout();
          window.location.href = '/login';
        }
        return throwError(() => err);
      })
    );
  }
}
