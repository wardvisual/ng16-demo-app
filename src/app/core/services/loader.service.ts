import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingStates: Map<any, boolean> = new Map<any, boolean>();

  setLoading(component: any, loading: boolean) {
    this.loadingStates.set(component, loading);
  }

  getLoading(component: any): boolean {
    return this.loadingStates.get(component) || false;
  }
}
