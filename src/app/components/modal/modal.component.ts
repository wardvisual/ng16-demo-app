import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
  modalState: boolean;

  @Input() title: string;
  @Input() name: string;
  @Output() toggleModalEvent = new EventEmitter();

  constructor(public modalService: ModalService) {}

  ngOnInit(): void {
    this.modalState = this.modalService.getModal(this.name);
    console.log({
      modalState: this.modalState,
      name: this.modalService.getModal(this.name),
    });
  }

  toggleModalFromOverlay(event?: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.modalService.toggleModal(this.name, false);
    }
  }
}
