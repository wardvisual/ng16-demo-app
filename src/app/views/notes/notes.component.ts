import { Component, OnInit } from '@angular/core';

import {
  AuthService,
  DateService,
  HttpService,
  LoaderService,
} from 'astronautaking/services';
import { ModalService, ToastService } from 'astronautaking/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateNote, Note, UpdateNote } from 'astronautaking/types';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  providers: [AuthService, HttpService],
})
export class NotesComponent implements OnInit {
  updateNoteForm: FormGroup<UpdateNote>;
  newNoteForm: FormGroup<CreateNote>;
  isButtonDisabled: boolean = true;
  note: Note;

  notes$ = new BehaviorSubject<Note[]>([]);
  notes = this.notes$.asObservable();

  constructor(
    public modalService: ModalService,
    public authService: AuthService,
    public httpService: HttpService,
    public dateService: DateService,
    public toastService: ToastService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.getNotes();
    this.createNewNoteForm();
    this.createUpdateNoteForm();

    console.log({ user: this.authService.user });
  }

  createNewNote(event: Event, note: FormGroup) {
    event.preventDefault();

    this.loaderService.setLoading('newNote', true);

    const createdAt = this.dateService.getCurrentDateTime();
    const id = this.authService?.user?.id;

    const noteData = {
      userId: id,
      createdAt,
      ...note.value,
    };

    console.log({ service: this.httpService });
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

    console.log({ parent: this.notes.subscribe });
    return this.notes;
  }

  updateNote(event: Event, id: string, note: FormGroup<UpdateNote>) {
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

  removeNote(id: string) {
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

  createNewNoteForm(): void {
    const currentDate = this.dateService.getCurrentDateTime();

    this.newNoteForm = new FormGroup<CreateNote>({
      content: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      createdAt: new FormControl(currentDate.toISOString()),
      userId: new FormControl(this.authService.user.id),
    });
  }

  createUpdateNoteForm(): void {
    this.updateNoteForm = new FormGroup<UpdateNote>({
      title: new FormControl(''),
      content: new FormControl(''),
    });
  }
}
