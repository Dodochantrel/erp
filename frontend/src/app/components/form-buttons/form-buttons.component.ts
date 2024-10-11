import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-buttons',
  standalone: true,
  imports: [],
  templateUrl: './form-buttons.component.html',
  styleUrl: './form-buttons.component.css'
})
export class FormButtonsComponent {
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  cancelForm() {
    this.cancel.emit();
  }

  saveForm() {
    this.save.emit();
  }
}
