import { Component, OnInit, computed, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import {
  LoaderService,
  LocalStorageService,
  RoutingService,
} from '@ng16-demoapp/services';
import { NoteFeatureService } from './note-feature.service';
import { ModalService, ToastService } from '@ng16-demoapp/components';
import { Note } from '../types/note.type';

@Component({
  selector: 'app-new-note',
  template: '',
})
export class NoteFeatureComponent implements OnInit {
  newNoteForm: FormGroup;
  isDisabled: boolean;
  notes = signal<Note[]>([]);

  notesList = computed(
    async () => (await this.noteService.getAllNotes()).result
  );

  constructor(
    public noteService: NoteFeatureService,
    public loaderService: LoaderService,
    public localStorageService: LocalStorageService,
    public routingService: RoutingService,
    public toastService: ToastService,
    public modalService: ModalService
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

  /**
   * Creates a new note when an event is triggered.
   *
   * @param {Event} event - The event object.
   * @return {Promise<void>} A promise that resolves when the note is created.
   */
  async onCreateNewNote(event: Event): Promise<void> {
    event.preventDefault();

    this.loaderService.setLoading(this, true);

    const response: any = await this.noteService.createNewNote({
      userId: this.localStorageService.getItem('currentUser').id,
      createdAt: new Date(),
      ...this.newNoteForm.value,
    });

    if (response.isSuccess) {
      await this.onGetAllNotes();
      this.toastService.openToast(response.isSuccess, response.message);
      this.modalService.toggleModal();
      console.log(response);
    }

    this.loaderService.setLoading(this, false);
  }

  async onGetAllNotes(): Promise<null | void> {
    this.loaderService.setLoading(this, true);

    const response: any = await this.noteService.getAllNotes();

    if (!response.isSuccess) {
      this.toastService.openToast(response.isSuccess, response.message);
    }

    this.loaderService.setLoading(this, false);

    this.notes.set([...this.notes(), response.result]);
  }
}
