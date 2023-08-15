import { Injectable, Signal, signal } from '@angular/core';
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

  /**
   * Checks if the current route matches the provided route.
   *
   * @param {string} route - The route to compare against the current route.
   * @return {boolean} Returns true if the current route matches the provided route, false otherwise.
   */
  checkCurrentRoute(route: string): boolean {
    return this.router.url === `/${route}`;
  }
}
