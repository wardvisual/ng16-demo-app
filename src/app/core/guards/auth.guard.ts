import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'astronautaking/services';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const auth = authService.isAuthenticated$.asObservable();

  auth.subscribe((isAuthenticated) => {
    if (!isAuthenticated) {
      router.navigateByUrl('/signin');
    }
  });

  return true;
};
