import { Component, Input, OnInit, Signal, signal } from '@angular/core';
import { ModalService } from '@ng16-demoapp/components';
import { Note } from '@ng16-demoapp/types';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent implements OnInit {
  @Input() note: Note;
  @Input() _updateNote: () => void;

  constructor(protected modalService: ModalService) {}

  ngOnInit(): void {
    console.log({ updated: this.note });
  }

  toggleUpdate(note: Partial<Note>) {
    // this.note.mutate((_note) => ({ ..._note, ...note }));
    console.log({ hi: 3423 });
    this._updateNote();
  }
}
