import { Injectable, OnInit, signal } from '@angular/core';
import { AuthService, SupabaseService } from '@ng16-demoapp/services';

import {
  CreateNote,
  Note,
  SupabaseResponse,
  UpdateNote,
} from '@ng16-demoapp/types';
import { LoaderService } from './loader.service';
import { DateService } from './date.service';
import { ModalService, ToastService } from '@ng16-demoapp/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NotesService implements OnInit {
  updateNoteForm: FormGroup<UpdateNote>;
  newNoteForm: FormGroup<CreateNote>;

  isButtonDisabled: boolean = true;
  notes = signal<Note[]>([]);
  note: Note;

  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
    private dateService: DateService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  createUpdateNoteForm(): void {
    this.updateNoteForm = new FormGroup<UpdateNote>({
      title: new FormControl(''),
      content: new FormControl(''),
    });
  }

  createNewNoteForm(): void {
    const currentDate = this.dateService.getCurrentDateTime();

    this.newNoteForm = new FormGroup<CreateNote>({
      content: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      createdAt: new FormControl(currentDate.toISOString()),
      userId: new FormControl(this.authService.user.id),
    });
  }

  async createNewNote(event: Event, note: FormGroup): Promise<void> {
    event.preventDefault();

    this.loaderService.setLoading('newNote', true);

    const { id } = this.authService.user;
    const createdAt = this.dateService.getCurrentDateTime();

    const noteData = {
      userId: id,
      createdAt,
      ...note.value,
    };

    const response: any = await this.supabaseService.supabase
      .from('notes')
      .insert([noteData])
      .select('*')
      .single();

    if (response.error) {
      this.toastService.openToast(false, 'Adding note failed');
      return;
    }

    this.notes.mutate((notes) => notes.push(response.data));

    this.toastService.openToast(true, 'Note successfully created!');

    this.modalService.toggleModal('newNote', false);
    this.loaderService.setLoading('newNote', false);
    // note.reset();
  }

  async viewSingleNote(id: string): Promise<void> {
    const response = await this.supabaseService.supabase
      .from('notes')
      .select()
      .eq('id', id)
      .single();

    if (response.error) {
      this.toastService.openToast(false, "Can't find note");
      return;
    }

    this.note = response.data;

    this.toastService.openToast(false, 'Notes successfully retrieved!');
  }

  async getAllNotes(): Promise<void> {
    this.loaderService.setLoading('getNotes', true);

    const userId = this.authService.user.id;

    const response = await this.supabaseService.supabase
      .from('notes')
      .select()
      .eq('userId', userId);

    if (response.error) {
      this.toastService.openToast(false, "Can't find notes");
      return;
    }

    this.notes.mutate((notes) => {
      notes.push(...response.data);
    });

    this.loaderService.setLoading('getNotes', false);

    this.toastService.openToast(true, 'Notes successfully retrieved!');
  }

  // TODO: Update note type
  async updateNote(event: Event, note: any): Promise<void> {
    event.preventDefault();

    this.loaderService.setLoading('updateNote', true);

    const response = await this.supabaseService.supabase
      .from('notes')
      .update(note.value)
      .eq('id', note.value.id)
      .select();

    if (response.error) {
      this.toastService.openToast(false, "Can't update note");
      return;
    }

    this.notes.mutate((notes) =>
      notes.map((_note) =>
        _note.id === note.value.id ? { ..._note, ...note.value } : _note
      )
    );

    this.toastService.openToast(true, 'Note successfully updated!');
    this.modalService.toggleModal(`${note.id}_updateNote`, false);
    this.loaderService.setLoading('updateNote', false);
  }

  async removeNote(id: string): Promise<void> {
    this.loaderService.setLoading(`deleteNote`, true);

    const response = await this.supabaseService.supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (response.error) {
      this.toastService.openToast(false, "Can't delete note");
      return;
    }

    this.notes.update((notes) => notes.filter((note) => note.id !== id));

    this.toastService.openToast(false, 'Note successfully deleted!');
    this.modalService.toggleModal(`${id}_deleteNote`, false);
    this.loaderService.setLoading(`_deleteNote`, false);
  }

  /**
   * Updates the disabled status based on the validation status.
   *
   * @param {boolean} status - The new validation status.
   */
  onValidationStatusChange(status: boolean) {
    this.isButtonDisabled = !status;
  }
}
