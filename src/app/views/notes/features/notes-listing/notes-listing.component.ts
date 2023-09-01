import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from 'astronautaking/components';
import { NotesService } from 'astronautaking/services';
import { Note, UpdateNote } from 'astronautaking/types';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-notes-listing',
  templateUrl: './notes-listing.component.html',
  styleUrls: ['./notes-listing.component.scss'],
})
export class NotestListingComponent implements OnInit {
  @Input() createUpdateNoteForm: () => void;
  @Input() updateNoteForm: FormGroup<UpdateNote>;
  @Input() notes: Note[];
  @Input() note: Note;

  constructor(public modalService: ModalService) {}

  ngOnInit(): void {}

  toggleViewNote(note: Note) {
    this.note = note;

    this.createUpdateNoteForm();

    this.updateNoteForm.setValue({
      title: note.title,
      content: note.content,
    });

    this.modalService.toggleModal(`${note.id}_viewNote`, true);
  }

  toggleUpdateNoteForm(id: string) {
    this.modalService.toggleModal(`${id}_viewNote`, false);
    this.modalService.toggleModal(`${id}_updateNote`, true);
  }

  toggleRemoveNote(id: string) {
    this.modalService.toggleModal(`${id}_viewNote`, false);
    this.modalService.toggleModal(`${id}_removeNote`, true);
  }
}
