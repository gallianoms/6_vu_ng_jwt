import { IAdmin } from '@/app/core/interfaces/admin.interface';
import { UserService } from '@/app/core/services/user.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrl: './admin-details.component.scss',
})
export class AdminDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  id: string | null = null;
  admin$!: Observable<IAdmin>;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.admin$ = this.userService.getAdminById(this.id);
  }
}
