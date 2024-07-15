import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminDetailsComponent } from './pages/admin-details/admin-details.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { SharedModule } from '@/app/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminDetailsComponent,
    CustomerDetailsComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
