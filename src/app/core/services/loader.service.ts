import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingStates: Map<any, boolean> = new Map<any, boolean>();

  /**
   * Sets the loading state for a specific component.
   *
   * @param {any} component - The component to set the loading state for.
   * @param {boolean} loading - The loading state to set.
   */
  setLoading(component: any, loading: boolean) {
    this.loadingStates.set(component, loading);
  }

  /**
   * Returns the loading state for a given component.
   *
   * @param {any} component - The component to check the loading state for.
   * @return {boolean} The loading state of the component. Defaults to false if not found.
   */
  getLoading(component: any): boolean {
    return this.loadingStates.get(component) || false;
  }
}
