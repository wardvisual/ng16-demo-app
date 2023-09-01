import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService, ToastService } from 'astronautaking/components';
import {
  AuthService,
  DateService,
  HttpService,
  LoaderService,
  NotesService,
} from 'astronautaking/services';
import { CreateNote } from 'astronautaking/types';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {
  @Input() createNewNote: (event: Event, note: FormGroup<CreateNote>) => void;
  @Input() onValidationStatusChange: (event: Event) => void;
  @Input() newNoteForm: FormGroup<CreateNote>;
  @Input() isButtonDisabled: boolean;

  constructor(
    public modalService: ModalService,
    public dateService: DateService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    console.log(this.createNewNote);
  }
}
