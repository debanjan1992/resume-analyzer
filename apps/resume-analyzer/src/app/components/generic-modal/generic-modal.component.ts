import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-modal.component.html',
})
export class GenericModalComponent {
  @Input() title = '';
  @Input() content = '';
  @Input() isOpen = false;
  @Output() closeEvent = new EventEmitter<void>();

  close() {
    this.closeEvent.emit();
  }
}
