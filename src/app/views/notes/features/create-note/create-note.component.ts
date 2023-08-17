import { Component, OnInit } from '@angular/core';
import { ModalService } from 'astronautaking/components';
import {
  AuthService,
  DateService,
  LoaderService,
  NotesService,
} from 'astronautaking/services';

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
