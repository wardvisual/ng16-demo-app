import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Toast {
  isToastSuccess: Subject<boolean>;
  toastMessage: Subject<string>;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast: Toast = {
    isToastSuccess: new Subject<boolean>(),
    toastMessage: new Subject<string>(),
  };

  constructor() {}

  /**
   * Opens a toast notification with the provided success status and message.
   *
   * @param {boolean} isToastSuccess - The success status of the toast notification.
   * @param {string} toastMessage - The message to be displayed in the toast notification.
   * @return {void} This function does not return anything.
   */
  openToast(isToastSuccess: boolean, toastMessage: string): void {
    this.toast.isToastSuccess.next(isToastSuccess);
    this.toast.toastMessage.next(toastMessage);
  }
}
