import { ICustomer } from '@/app/core/interfaces/customer.interface';
import { UserService } from '@/app/core/services/user.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  id: string | null = null;
  customer$!: Observable<ICustomer>;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.customer$ = this.userService.getCustomerById(this.id);
  }
}
