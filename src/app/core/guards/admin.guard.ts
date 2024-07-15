import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivateFn } from '@angular/router';
import { Observable, map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.role$.pipe(
    map(role => {
      return role === 'admin' || role === 'tester' || role === 'dev';
    }),
  );
};
