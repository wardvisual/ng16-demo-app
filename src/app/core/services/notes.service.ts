import { Injectable, OnInit, signal } from '@angular/core';
import {
  AuthService,
  HttpService,
  SupabaseService,
} from 'astronautaking/services';

import {
  CreateNote,
  Note,
  SupabaseResponse,
  UpdateNote,
} from 'astronautaking/types';
import { LoaderService } from './loader.service';
import { DateService } from './date.service';
import { ModalService, ToastService } from 'astronautaking/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  updateNoteForm: FormGroup<UpdateNote>;
  newNoteForm: FormGroup<CreateNote>;
  isButtonDisabled: boolean = true;
  notes = signal<Note[]>([]);
  note: Note;

  notes$ = new BehaviorSubject<Note[]>([]);
  _notes = this.notes$.asObservable();

  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
    private dateService: DateService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private modalService: ModalService,
    private httpService: HttpService
  ) {}

  createNewNote(event: Event, note: FormGroup) {
    event.preventDefault();

    this.loaderService.setLoading('newNote', true);

    const createdAt = this.dateService.getCurrentDateTime();
    const { id } = this.authService.user;

    const noteData = {
      userId: id,
      createdAt,
      ...note.value,
    };

    this.httpService.post('/notes', noteData).subscribe((res: any) => {
      this.toastService.openToast(res.isSuccess, res.message);

      if (!res.isSuccess) return;

      this.modalService.toggleModal('newNote', false);
      this.loaderService.setLoading('newNote', false);

      this.newNoteForm.reset();
    });

    this.httpService.get('/notes').subscribe((res: any) => {
      if (!res.isSuccess) return;
      this.notes$.next(res.data);
    });
  }

  getNotes() {
    this.loaderService.setLoading('getNotes', true);

    this.httpService.get('/notes').subscribe((res: any) => {
      this.toastService.openToast(res.isSuccess, res.message);

      if (!res.isSuccess) return;

      this.notes$.next(res.data);
    });

    return this._notes;
  }

  async updateNote(event: Event, id: string, note: FormGroup<UpdateNote>) {
    event.preventDefault();

    this.httpService.patch(`/notes/${id}`, note.value).subscribe((res: any) => {
      this.toastService.openToast(res.isSuccess, res.message);

      if (!res.isSuccess) return;

      this.notes$.next(
        this.notes$.getValue().map((note: any) => {
          if (note.id === id) return { ...res.data, ...note.value };

          return note;
        })
      );

      this.modalService.toggleModal(`${note.value.id}_updateNote`, false);
      this.loaderService.setLoading('updateNote', false);
    });
  }

  async removeNote(id: string) {
    this.loaderService.setLoading(`deleteNote`, true);

    this.httpService.delete(`/notes/${id}`).subscribe((res: any) => {
      this.toastService.openToast(res.isSuccess, res.message);

      if (!res.isSuccess) return;

      const currentNotes = this.notes$.getValue();

      this.notes$.next(currentNotes.filter((note: any) => note.id !== id));

      this.modalService.toggleModal(`${id}_removeNote`, false);
      this.loaderService.setLoading(`_removeNote`, false);
    });
  }

  onValidationStatusChange(status: boolean) {
    this.isButtonDisabled = !status;
  }
}
