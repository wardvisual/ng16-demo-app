import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import {
  AuthService,
  LoaderService,
  LocalStorageService,
  RoutingService,
  DateService,
} from '@ng16-demoapp/services';
import { NotesService } from './notes-component.service';
import { ModalService, ToastService } from '@ng16-demoapp/components';
import { CreateNote, Note } from '@ng16-demoapp/types';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  toggleSidebar: boolean;
  isModalOpen: boolean;
  newNoteForm: FormGroup;
  isButtonDisabled: boolean;

  notes = signal<Note[]>([]);

  constructor(
    protected noteService: NotesService,
    protected loaderService: LoaderService,
    protected localStorageService: LocalStorageService,
    protected routingService: RoutingService,
    protected toastService: ToastService,
    protected modalService: ModalService,
    protected authService: AuthService,
    protected dateService: DateService
  ) {}

  /**
   * Initializes the component and performs necessary setup actions.
   *
   * @return {void} This function does not return anything.
   */
  ngOnInit(): void {
    this.getAllNotes();
    this.createNewNoteForm();

    /* Initialize attributes values */
    this.isButtonDisabled = true;
    this.isModalOpen = false;
    this.toggleSidebar = true;
  }

  /**
   * Updates the disabled status based on the validation status.
   *
   * @param {boolean} status - The new validation status.
   */
  onValidationStatusChange(status: boolean) {
    this.isButtonDisabled = !status;
  }

  /**
   * Creates a new note form.
   *
   * @return {void}
   */
  createNewNoteForm(): void {
    const currentDate = this.dateService.getCurrentDateTime();

    this.newNoteForm = new FormGroup<CreateNote>({
      content: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      createdAt: new FormControl(currentDate.toISOString()),
      userId: new FormControl(this.user.id),
    });
  }

  /**
   * Creates a new note
   *
   * @param {Event} event - The event object.
   * @return {Promise<void>} A promise that resolves when the note is created.
   */
  async createNewNote(event: Event): Promise<void> {
    event.preventDefault();

    this.loaderService.setLoading('newNote', true);

    const { id } = this.user;
    const createdAt = this.dateService.getCurrentDateTime();

    const note = {
      userId: id,
      createdAt,
      ...this.newNoteForm.value,
    };

    const response = await this.noteService.createNewNote(note);

    this.toastService.openToast(response.isSuccess, response.message);

    if (!response.isSuccess) return;

    this.notes.mutate((notes) => notes.push(response.result));

    this.modalService.toggleModal('newNote', false);
    this.loaderService.setLoading('newNote', false);
    this.newNoteForm.reset();
  }

  /**
   * Retrieves all notes from the service.
   *
   * @return {Promise<void | Note[]>} A promise that resolves with an array of notes or void if there was an error.
   */
  async getAllNotes(): Promise<Note[]> {
    this.loaderService.setLoading('getNotes', true);

    const response = await this.noteService.getAllNotes(this.user.id);

    this.toastService.openToast(response.isSuccess, response.message);

    if (!response.isSuccess) return [];

    // this.previousNotesLength = this.notes().length;

    this.notes.mutate((notes) => {
      notes.push(...response.result);
    });

    this.loaderService.setLoading('getNotes', false);

    return response.result;
  }

  updateNote(note: Note) {
    const response = this.noteService.updateNote(note);
  }

  removeNote({ id }: Note) {}

  get user() {
    return this.authService.user;
  }
}
