import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private toggleModalStateSubject = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.toggleModalStateSubject.asObservable();

  constructor() {}

  toggleModal(): void {
    this.toggleModalStateSubject.next(!this.toggleModalStateSubject.value);
  }
}
