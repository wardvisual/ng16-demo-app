import { Component, Input, OnInit, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'astronautaking/components';
import { LoaderService, NotesService } from 'astronautaking/services';
import { Note, UpdateNote } from 'astronautaking/types';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent implements OnInit {
  @Input() updateNote: (event: Event, note: FormGroup<UpdateNote>) => void;
  @Input() onValidationStatusChange: (event: Event) => void;
  @Input() isButtonDisabled: boolean;
  @Input() note: Note;

  constructor(
    public modalService: ModalService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {}
}
