import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';
import { switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  isToastVisible: boolean;
  isToastSuccess: boolean;
  icon: string = 'square-rounded-x';
  toastMessage: string = '';

  constructor(private toastService: ToastService) {}

  /**
   * Initializes the component and subscribes to the toastService's isToastSuccess observable.
   * When a success toast is emitted, the toast message is displayed and the component's properties are updated accordingly.
   * After displaying the toast message, the component's visibility is set to true and a timeout is set to hide the toast after 5 seconds.
   */
  ngOnInit(): void {
    this.toastService.toast.isToastSuccess
      .pipe(
        tap((toast) => {
          this.isToastSuccess = toast;
          if (this.isToastSuccess) {
            this.icon = 'square-rounded-check';
          }
        }),
        switchMap(() => this.toastService.toast.toastMessage.pipe(take(1)))
      )
      .subscribe((toastMessage) => {
        this.toastMessage = toastMessage;
        this.isToastVisible = true;
        setTimeout(() => {
          this.hide();
        }, 5000);
      });
  }

  /**
   * Hides the element and clears the message.
   *
   * @return {void}
   */
  hide(): void {
    this.isToastVisible = false;
    this.toastMessage = '';
  }
}
