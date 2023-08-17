import { Component, Input, OnInit, Signal } from '@angular/core';
import { ModalService } from 'astronautaking/components';
import { NotesService } from 'astronautaking/services';
import { Note } from 'astronautaking/types';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
  selector: 'app-remove-note',
  templateUrl: './remove-note.component.html',
  styleUrls: ['./remove-note.component.scss'],
})
export class RemoveNoteComponent implements OnInit {
  constructor(
    public notesService: NotesService,
    public modalService: ModalService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {}
}
