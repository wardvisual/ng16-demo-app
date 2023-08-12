import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
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
  @Input() icon?: string;

  onClick() {
    this.buttonClick.emit();
  }
}
