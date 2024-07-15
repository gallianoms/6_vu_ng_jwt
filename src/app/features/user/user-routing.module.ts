import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { AdminDetailsComponent } from './pages/admin-details/admin-details.component';
import { adminGuard } from '@/app/core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [adminGuard],
    component: DashboardComponent,
  },
  {
    path: 'admin/:id',
    component: AdminDetailsComponent,
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
