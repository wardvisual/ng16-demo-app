import { Component, Input, OnInit, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@ng16-demoapp/components';
import { LoaderService, NotesService } from '@ng16-demoapp/services';
import { Note, UpdateNote } from '@ng16-demoapp/types';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent implements OnInit {
  constructor(
    public modalService: ModalService,
    public notesService: NotesService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {}
}
