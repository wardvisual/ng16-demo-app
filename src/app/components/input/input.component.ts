import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label!: string;
  @Input() type!: string;
  @Input() name!: string;
  @Input() value!: string;
  @Input() required!: string;

  @Input() formControl!: FormControl;

  handleDisplayErrors() {
    const { dirty, touched, errors } = this.formControl;

    return dirty && touched && errors;
  }
}
