import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-section.component.html',
  styleUrl: './input-section.component.css'
})
export class InputSectionComponent {
  @Input() typeOfInput = "text"

  inputValue: string = '';

  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();

  onInputValueChange(value: string) {
    this.inputValue = value;
    this.inputValueChange.emit(this.inputValue);
  }
}
