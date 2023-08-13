import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '@ng16-demoapp/components';

import { LocalStorageService, RoutingService } from '@ng16-demoapp/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  toggleSidebar: boolean = true;
  isModalOpen: boolean = false;

  newNoteForm: FormGroup;
  isDisabled: boolean;

  constructor(
    private localStorageService: LocalStorageService,
    private routingService: RoutingService,
    private modalService: ModalService
  ) {}

  toggleModal() {
    this.modalService.toggleModal();
  }

  get fullName(): string {
    const user = this.localStorageService.getItem('currentUser');

    return `${user.firstName} ${user.lastName}`;
  }

  logout(): void {
    this.localStorageService.removeItem('currentUser');
    this.routingService.redirectTo('/signin');
  }
}
