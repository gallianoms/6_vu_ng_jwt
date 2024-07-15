import { Injectable } from '@angular/core';
import { AbstractLocalStorage } from '../contracts/local-storage.contract';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements AbstractLocalStorage {
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
