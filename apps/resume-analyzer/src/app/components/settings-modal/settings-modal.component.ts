import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ResumeAnalysisStore } from '../../resume.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './settings-modal.component.html',
  styleUrl: './settings-modal.component.scss',
})
export class SettingsModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Output() closeEvent = new EventEmitter<void>();

  store = inject(ResumeAnalysisStore);
  apiKey = '';

  constructor() {
    this.apiKey = this.store.apiKey();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && this.isOpen) {
      this.apiKey = this.store.apiKey();
    }
  }

  save() {
    this.store.setAPIKey(this.apiKey);
    this.closeEvent.emit();
  }

  closeModal() {
    this.closeEvent.emit();
  }
}
