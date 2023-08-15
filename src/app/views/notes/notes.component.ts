import { Component, OnInit } from '@angular/core';

import { AuthService } from '@ng16-demoapp/services';
import { ModalService } from '@ng16-demoapp/components';
import { NotesService } from '../../core/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  constructor(
    protected modalService: ModalService,
    protected authService: AuthService,
    protected notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.notesService.createNewNoteForm();
    this.notesService.createUpdateNoteForm();
  }
}
