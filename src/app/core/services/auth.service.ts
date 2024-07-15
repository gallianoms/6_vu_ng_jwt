import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@/environments/environment.development';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

type Token = {
  accessToken: string;
  refreshToken: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private localStorage = inject(LocalStorageService);
  private router = inject(Router);
  private _loggedIn$ = new BehaviorSubject<boolean>(false);
  private _role$ = new BehaviorSubject<string>('');

  public login(role: string, password: string): Observable<boolean> {
    return this.http
      .post<Token>(environment.baseUrl + '/login/authenticate', {
        role,
        password,
      })
      .pipe(
        map((response: Token) => {
          this.localStorage.setItem('accessToken', response.accessToken);
          this.localStorage.setItem('refreshToken', response.refreshToken);
          this._loggedIn$.next(true);
          this._role$.next(role);
          return true;
        }),
        catchError(error => {
          if (error.status === 401) {
            console.error('Unauthorized: Invalid role or password');
          } else {
            console.error('An error occurred:', error);
          }
          return of(false);
        }),
      );
  }

  public logout(): void {
    this.localStorage.removeItem('accessToken');
    this.localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
    this._loggedIn$.next(false);
  }

  public refreshToken(): Observable<{ accessToken: string }> {
    const refreshToken = this.localStorage.getItem('refreshToken');
    return this.http.post<{ accessToken: string }>(
      environment.baseUrl + '/login/refresh-token',
      {
        refreshToken,
      },
    );
  }

  get loggedIn$(): Observable<boolean> {
    return this._loggedIn$.asObservable();
  }

  get role$(): Observable<string> {
    return this._role$.asObservable();
  }
}
