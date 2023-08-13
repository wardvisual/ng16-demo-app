import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title: string;

  @Output() toggleModalEvent = new EventEmitter();

  isOpen$: Observable<boolean>;

  constructor(public modalService: ModalService) {}

  ngOnInit(): void {
    this.isOpen$ = this.modalService.isOpen$;
  }

  toggleModalFromOverlay(event?: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.toggleModalEvent.emit();
    }
  }
}
