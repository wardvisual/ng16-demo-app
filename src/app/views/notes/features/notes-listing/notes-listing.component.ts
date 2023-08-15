import { Component, OnInit } from '@angular/core';
import { ModalService } from '@ng16-demoapp/components';
import { NotesService } from '@ng16-demoapp/services';
import { Note } from '@ng16-demoapp/types';

@Component({
  selector: 'app-notes-listing',
  templateUrl: './notes-listing.component.html',
  styleUrls: ['./notes-listing.component.scss'],
})
export class NotestListingComponent implements OnInit {
  constructor(
    public notesService: NotesService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.notesService.getAllNotes();
  }

  toggleViewNote(note: Note) {
    this.notesService.note = note;
    this.notesService.createUpdateNoteForm();
    this.notesService.updateNoteForm.setValue({
      title: note.title,
      content: note.content,
    });

    this.modalService.toggleModal(`${note.id}_viewNote`, true);
  }

  toggleUpdateNoteForm(note: Note) {
    this.modalService.toggleModal(`${note.id}_viewNote`, false);
    this.modalService.toggleModal(`${note.id}_updateNote`, true);
  }

  toggleRemoveNote(note: Note) {
    console.log({ note });
    this.modalService.toggleModal(`${note.id}_viewNote`, false);
    this.modalService.toggleModal(`${note.id}_removeNote`, true);
  }
}
