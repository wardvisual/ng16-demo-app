import { Component, OnInit, computed, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import { Note } from './types/note.type';

import {
  AuthService,
  LoaderService,
  LocalStorageService,
  RoutingService,
} from '@ng16-demoapp/services';
import { NotesService } from './notes-component.service';
import { ModalService, ToastService } from '@ng16-demoapp/components';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  toggleSidebar: boolean = true;
  isModalOpen: boolean = false;
  newNoteForm: FormGroup;
  isDisabled: boolean;

  newlyCreatedNote: Note;

  notes = signal<Note[]>([]);

  notesList = computed(() => {
    return this.notes().length;
  });

  constructor(
    protected noteService: NotesService,
    protected loaderService: LoaderService,
    protected localStorageService: LocalStorageService,
    protected routingService: RoutingService,
    protected toastService: ToastService,
    protected modalService: ModalService,
    protected authService: AuthService
  ) {}

  ngOnInit(): void {
    this.onGetAllNotes();
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
      userId: new FormControl(this.user.id),
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

    const newNote: Note = {
      userId: this.user.id,
      createdAt: Date.now(),
      ...this.newNoteForm.value,
    };

    const response: any = await this.noteService.createNewNote(newNote);
    console.log({ response, newNote });

    if (response.isSuccess) {
      this.notes.mutate((notes: any) => {
        notes.push(newNote);
      });

      this.toastService.openToast(response.isSuccess, response.message);
      this.modalService.toggleModal();
      this.newNoteForm.reset();
    }

    this.loaderService.setLoading(this, false);
  }

  async onGetAllNotes(): Promise<void | Note[]> {
    this.loaderService.setLoading(this, true);

    const response: any = await this.noteService.getAllNotes(this.user.id);

    if (!response.isSuccess) {
      this.toastService.openToast(response.isSuccess, response.message);
      return;
    }

    console.log({ response });

    this.notes.mutate((notes) => {
      for (const note of response.result) {
        notes.push(note);
      }
    });

    console.log({ all: this.notes() });

    this.loaderService.setLoading(this, false);

    return response.result;
  }

  toggleModal() {
    this.modalService.toggleModal();
  }

  get user() {
    return this.authService.user;
  }
}
