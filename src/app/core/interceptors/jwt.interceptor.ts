import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import {
  catchError,
  throwError,
  pipe,
  switchMap,
  Observable,
  take,
} from 'rxjs';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (
  req,
  next,
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const localStorage = inject(LocalStorageService);

  const accessToken = getAccessToken() || '';

  if (accessToken) {
    req = req.clone({
      headers: req.headers.set('Authorization', accessToken),
    });
  }

  // TODO: FIX ERROR
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/login/authenticate')) {
        return authService.refreshToken().pipe(
          take(1),
          switchMap(response => {
            localStorage.setItem('accessToken', response.accessToken);
            const newReq = req.clone({
              headers: req.headers.set('Authorization', response.accessToken),
            });
            return next(newReq);
          }),
          catchError(refreshError => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return throwError(() => refreshError);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
  // return next(req);
};

const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};
