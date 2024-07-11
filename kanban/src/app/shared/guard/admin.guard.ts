import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../service/localstoreage.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(LocalStorageService);
  const router = inject(Router);
  if (store.getToken() && store.getUser() == "admin") {
    return true;
  }
  else {
    return false
  }
};
