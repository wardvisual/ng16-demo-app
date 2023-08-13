import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import {
  LoaderService,
  LocalStorageService,
  RoutingService,
} from '@ng16-demoapp/services';
import { NoteFeatureService } from './note-feature.service';
import { SupabaseResponse } from '@ng16-demoapp/types';
import { ToastService } from '@ng16-demoapp/components';
import { Note } from '../types/note.type';

@Component({
  selector: 'app-new-note',
  template: '',
})
export class NoteFeatureComponent implements OnInit {
  newNoteForm: FormGroup;
  isDisabled: boolean;
  notes: Note[];

  constructor(
    public noteService: NoteFeatureService,
    public loaderService: LoaderService,
    public localStorageService: LocalStorageService,
    public routingService: RoutingService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.createNewNoteForm();

    this.isDisabled = true;
  }

  onValidationStatusChange(status: boolean) {
    this.isDisabled = !status;
  }

  /**
   * Creates a new note form.
   *
   * @return {void}
   */
  createNewNoteForm(): void {
    const currentDate = new Date();
    this.newNoteForm = new FormGroup<Note>({
      content: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      createdAt: new FormControl(currentDate.toISOString()),
      userId: new FormControl(
        this.localStorageService.getItem('currentUser').id
      ),
    });
  }

  async onCreateNewNote(event: Event): Promise<void> {
    event.preventDefault();

    this.loaderService.setLoading(true);

    const response: any = await this.noteService.createNewNote({
      userId: this.localStorageService.getItem('currentUser').id,
      createdAt: new Date(),
      ...this.newNoteForm.value,
    });

    this.loaderService.setLoading(false);

    this.toastService.openToast(response.isSuccess, response.message);

    console.log(response);
  }

  onGetAllNotes(): null | void {
    this.loaderService.setLoading(true);

    const response: any = this.noteService.getAllNotes();

    if (!response.isSuccess) {
      // display error
      return;
    }

    console.log({ response });
    this.loaderService.setLoading(false);

    this.notes = response.result;
  }
}
