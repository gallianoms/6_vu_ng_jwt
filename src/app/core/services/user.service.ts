import { IAdminResponse } from './../interfaces/admin-response.interface';
import { Injectable, inject } from '@angular/core';
import { AbstractUser } from '../contracts/user.contract';
import { Observable, catchError, map, pipe } from 'rxjs';
import { IAdmin } from '../interfaces/admin.interface';
import { ICustomer } from '../interfaces/customer.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment.development';
import { ICustomerResponse } from '../interfaces/customer-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements AbstractUser {
  private http = inject(HttpClient);

  getAdmins(): Observable<IAdmin[]> {
    return this.http.get<IAdminResponse>(environment.baseUrl + '/admin').pipe(
      map((response: IAdminResponse) => response.data),
      catchError(error => {
        console.error(error);
        throw error;
      }),
    );
  }

  getCustomers(): Observable<ICustomer[]> {
    return this.http
      .get<ICustomerResponse>(environment.baseUrl + '/customers')
      .pipe(
        map((response: ICustomerResponse) => response.data),
        catchError(error => {
          console.error(error);
          throw error;
        }),
      );
  }

  getAdminById(id: string): Observable<IAdmin> {
    return this.http.get<IAdmin>(environment.baseUrl + '/admin/' + id).pipe(
      map((response: any) => response.data),
      catchError(error => {
        console.error(error);
        throw error;
      }),
    );
  }

  getCustomerById(id: string): Observable<ICustomer> {
    return this.http
      .get<ICustomer>(environment.baseUrl + '/customers/' + id)
      .pipe(
        map((response: any) => response.data),
        catchError(error => {
          console.error(error);
          throw error;
        }),
      );
  }
}
