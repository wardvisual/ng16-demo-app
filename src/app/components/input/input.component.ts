import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() name: string;
  @Input() value: string;
  @Input() required: boolean;

  @Input() formControl: FormControl;

  ngOnInit() {}

  displayErrors() {
    const { dirty, touched, errors } = this.formControl;
    console.log({ dirty, touched, errors });
    return dirty && touched && errors;
  }
}
