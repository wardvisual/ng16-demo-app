import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@ng16-demoapp/services';
import { RoutingService } from '@ng16-demoapp/services';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const routingService = inject(RoutingService);

  if (authService.isAuthenticated()) {
    return true;
  }

  routingService.redirectTo('signin');
  return false;
};
