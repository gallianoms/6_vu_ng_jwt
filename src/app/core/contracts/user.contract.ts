import { Observable } from 'rxjs';
import { IAdmin } from '../interfaces/admin.interface';
import { ICustomer } from '../interfaces/customer.interface';

export abstract class AbstractUser {
  abstract getAdmins(): Observable<IAdmin[]>;
  abstract getCustomers(): Observable<ICustomer[]>;
  abstract getAdminById(id: string): Observable<IAdmin>;
  abstract getCustomerById(id: string): Observable<ICustomer>;
}
