import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const authGuard: CanActivateFn = () => {
  const localStorage = inject(LocalStorageService);
  if (localStorage.getItem('accessToken')) {
    return true;
  } else {
    return false;
  }
};
