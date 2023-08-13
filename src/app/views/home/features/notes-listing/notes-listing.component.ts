import { Component, OnInit } from '@angular/core';

import { NoteFeatureComponent } from '../note-feature.component';

import {
  LoaderService,
  LocalStorageService,
  RoutingService,
} from '@ng16-demoapp/services';
import { ModalService, ToastService } from '@ng16-demoapp/components';

import { NoteFeatureService } from '../note-feature.service';

@Component({
  selector: 'app-notes-listing',
  templateUrl: './notes-listing.component.html',
  styleUrls: ['./notes-listing.component.scss'],
})
export class NotestListingComponent
  extends NoteFeatureComponent
  implements OnInit
{
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

  override ngOnInit(): void {
    this.onGetAllNotes();
  }
}
