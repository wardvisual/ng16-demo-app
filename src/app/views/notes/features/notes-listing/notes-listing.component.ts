import { Component, Input, OnInit, Signal } from '@angular/core';
import { ModalService } from '@ng16-demoapp/components';
import { Note } from '@ng16-demoapp/types';

@Component({
  selector: 'app-notes-listing',
  templateUrl: './notes-listing.component.html',
  styleUrls: ['./notes-listing.component.scss'],
})
export class NotestListingComponent implements OnInit {
  @Input() notes: Signal<Note[]>;
  @Input() notesList: number;
  @Input() callback: (note: Note) => void;

  selectedNote: Note;

  constructor(protected modalService: ModalService) {}

  ngOnInit(): void {}

  toggleViewNote(note: Note) {
    this.selectedNote = note;

    this.callback(note);

    this.modalService.toggleModal(note.id, true);
  }
}
