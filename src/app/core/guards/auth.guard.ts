import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const authGuard: CanActivateFn = () => {
  const localStorage = inject(LocalStorageService);
  const router = inject(Router);
  if (localStorage.getItem('token')) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
