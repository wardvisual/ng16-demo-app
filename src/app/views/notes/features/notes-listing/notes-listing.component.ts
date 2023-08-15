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

  ngOnInit(): void {}

  /**
   * Toggles the view of a note.
   *
   * @param {Note} note - The note to be viewed.
   */
  toggleViewNote(note: Note) {
    this.notesService.note = note;

    // Create update form
    this.notesService.createUpdateNoteForm();

    // Set default values for the updateNote form
    this.notesService.updateNoteForm.setValue({
      title: note.title,
      content: note.content,
    });

    this.modalService.toggleModal(`${note.id}_viewNote`, true);
  }

  /**
   * Toggle the update note form.
   *
   * @param {Id} id - The note to update.
   */
  toggleUpdateNoteForm(id: string) {
    this.modalService.toggleModal(`${id}_viewNote`, false);
    this.modalService.toggleModal(`${id}_updateNote`, true);
  }

  /**
   * Toggles the remove note modal for a given ID.
   *
   * @param {string} id - The note to be removed.
   */
  toggleRemoveNote(id: string) {
    this.modalService.toggleModal(`${id}_viewNote`, false);
    this.modalService.toggleModal(`${id}_removeNote`, true);
  }
}
