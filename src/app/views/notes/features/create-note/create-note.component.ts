import { Component, Input, OnInit, Signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@ng16-demoapp/components';
import {
  AuthService,
  DateService,
  LoaderService,
  NotesService,
} from '@ng16-demoapp/services';
import { CreateNote, Note } from '@ng16-demoapp/types';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {
  constructor(
    public notesService: NotesService,
    public modalService: ModalService,
    public dateService: DateService,
    public authService: AuthService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {}
}
