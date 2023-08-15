import { Component, Input, OnInit, Signal } from '@angular/core';
import { ModalService } from '@ng16-demoapp/components';
import { NotesService } from '@ng16-demoapp/services';
import { Note } from '@ng16-demoapp/types';

@Component({
  selector: 'app-remove-note',
  templateUrl: './remove-note.component.html',
  styleUrls: ['./remove-note.component.scss'],
})
export class RemoveNoteComponent implements OnInit {
  constructor(
    public notesService: NotesService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {}
}
