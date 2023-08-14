import { Component } from '@angular/core';
import { NotesComponent } from '../../notes.component';
import { NotesService } from '../../notes-component.service';
import {
  AuthService,
  LoaderService,
  LocalStorageService,
  RoutingService,
} from '@ng16-demoapp/services';
import { ModalService, ToastService } from '@ng16-demoapp/components';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
})
export class NewNoteComponent extends NotesComponent {
  constructor(
    protected override noteService: NotesService,
    protected override loaderService: LoaderService,
    protected override localStorageService: LocalStorageService,
    protected override routingService: RoutingService,
    protected override toastService: ToastService,
    protected override modalService: ModalService,
    protected override authService: AuthService
  ) {
    super(
      noteService,
      loaderService,
      localStorageService,
      routingService,
      toastService,
      modalService,
      authService
    );
  }
}
