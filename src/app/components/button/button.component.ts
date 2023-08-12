import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  set name(name: string) {
    this.buttonName = name.toLocaleUpperCase();
  }
  get name(): string {
    return this.buttonName;
  }

  @Output() buttonClick?: EventEmitter<any> = new EventEmitter();
  @Input() buttonName: string;
  @Input() type: string;
  @Input() variant: string;
  @Input() isDisabled = false;

  onClick() {
    this.buttonClick.emit();
  }
}
