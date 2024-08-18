import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Input() inputClases = '';
  @Input() inputType = 'text';
  @Input() placeHolder = '';
  @Input() label = '';
  @Input() classOveride = false;
  @Input() control!: FormControl;
  @Input() autocomplete = '';

}
