import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { catchError, switchMap, take, Observable, throwError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (
  req,
  next,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const localStorage = inject(LocalStorageService);
  const token = localStorage.getItem('token');

  // Clone the request if token is available
  const authReq = token
    ? req.clone({ headers: req.headers.set('Authorization', token) })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) =>
      handleAuthError(error, authService, localStorage, req, next),
    ),
  );
};

const handleAuthError = (
  error: HttpErrorResponse,
  authService: AuthService,
  localStorage: LocalStorageService,
  req: HttpRequest<unknown>,
  next: (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>,
): Observable<HttpEvent<unknown>> => {
  const isUnauthorized = error.status === 401;
  const isAuthRequest = req.url.includes('authenticate');

  if (!isUnauthorized || isAuthRequest) {
    return throwError(() => error);
  }

  return authService.refreshToken().pipe(
    take(1),
    switchMap(response => {
      const { token } = response;

      if (token) {
        localStorage.setItem('token', token);
        const authReq = req.clone({
          headers: req.headers.set('Authorization', token),
        });
        return next(authReq);
      }

      clearTokens(localStorage);
      return throwError(() => new Error('Failed to refresh access token'));
    }),

    catchError(refreshError => {
      clearTokens(localStorage);
      return throwError(() => refreshError);
    }),
  );
};

const clearTokens = (localStorage: LocalStorageService) => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};
