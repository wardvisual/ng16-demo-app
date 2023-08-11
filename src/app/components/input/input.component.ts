import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlName, FormGroup } from '@angular/forms';
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

  @Input() formControlName: string;
  @Input() formGroup: FormGroup;

  ngOnInit() {}

  displayErrors() {
    const { dirty, touched, errors } = this.formGroup;
    return dirty && touched && errors;
  }
}
