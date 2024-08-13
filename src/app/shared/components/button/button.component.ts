import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() inputClasses = ''
  @Output('buttonClick') buttonClick = new EventEmitter<any>();
  @Input('disabled') disabled = false;

  onClick(event: any) {
    this.buttonClick.emit(event)
  }
}
