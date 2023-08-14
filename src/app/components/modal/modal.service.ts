import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalState = signal<Map<string, boolean>>(new Map<string, boolean>());

  constructor() {}

  toggleModal(name: string, state: boolean): void {
    this.modalState.mutate((modal) => {
      return modal.set(name, state);
    });
  }

  getModal(name: string) {
    return this.modalState().get(name);
  }
}
