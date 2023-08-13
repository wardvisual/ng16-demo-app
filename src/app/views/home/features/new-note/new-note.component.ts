import { Component } from '@angular/core';

import { NoteFeatureComponent } from '../note-feature.component';

import {
  LoaderService,
  LocalStorageService,
  RoutingService,
} from '@ng16-demoapp/services';
import { ModalService, ToastService } from '@ng16-demoapp/components';

import { NoteFeatureService } from '../note-feature.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
})
export class NewNoteComponent extends NoteFeatureComponent {
  constructor(
    public override noteService: NoteFeatureService,
    public override loaderService: LoaderService,
    public override localStorageService: LocalStorageService,
    public override routingService: RoutingService,
    public override toastService: ToastService,
    public override modalService: ModalService
  ) {
    super(
      noteService,
      loaderService,
      localStorageService,
      routingService,
      toastService,
      modalService
    );
  }
}
