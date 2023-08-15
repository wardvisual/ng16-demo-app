import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private router: Router) {}

  /**
   * Redirects to the specified route.
   *
   * @param {string} route - The route to navigate to.
   * @return {void} This function does not return anything.
   */
  redirectTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
