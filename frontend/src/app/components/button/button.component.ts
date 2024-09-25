import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() color: string = '';
  @Input() icon: string | null = null;
  @Output() output: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.output.emit();
  }
}
