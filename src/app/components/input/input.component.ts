import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() name: string;
  @Input() value: string;
  @Input() required: boolean;
  @Output() validationStatusChange = new EventEmitter<boolean>();

  @Input() formControlName: string;
  @Input() formGroup: FormGroup;

  /**
   * Initializes the component and sets up a subscription to listen for changes in the form control value.
   */
  ngOnInit() {
    this.formGroup.get(this.formControlName).valueChanges.subscribe(() => {
      this.validationStatusChange.emit(this.formGroup.valid);
    });
  }

  /**
   * Returns an error message if the form control is invalid and has been touched or dirty.
   * Otherwise, returns null.
   *
   * @return {string | null} The error message or null if there are no errors
   */
  displayErrors(): string | null {
    const control = this.formGroup.get(this.formControlName);

    if (control && control.invalid && (control.dirty || control.touched)) {
      if (control.errors.required) {
        return 'This field is required';
      }

      if (control.errors.minlength) {
        return `This value has ${control.errors.minlength.actualLength} but must be at least ${control.errors.minlength.requiredLength}`;
      }

      if (control.errors.pattern) {
        return 'This value does not match the required pattern';
      }
    }

    return null;
  }
}
