import { ICustomer } from '@/app/core/interfaces/customer.interface';
import { UserService } from './../../../../core/services/user.service';
import { IAdmin } from '@/app/core/interfaces/admin.interface';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  admins$!: Observable<IAdmin[]>;
  customers$!: Observable<ICustomer[]>;
  role: string | null = null;

  ngOnInit(): void {
    this.admins$ = this.userService.getAdmins();
    this.customers$ = this.userService.getCustomers();
    this.authService.role$.subscribe(role => (this.role = role));
  }

  seeAdminDetails(id: number) {
    this.router.navigate([`dashboard/admin/${id}`]);
  }

  seeCustomerDetails(id: number) {
    this.router.navigate([`dashboard/customers/${id}`]);
  }
}
