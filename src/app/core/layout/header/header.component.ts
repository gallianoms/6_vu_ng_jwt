import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  isLoggedIn$ = new Observable<boolean>(observer => observer.next(false));

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.loggedIn$;
  }

  logout(): void {
    this.authService.logout();
  }
}
