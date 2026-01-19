import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ResumeAnalysisStore } from '../../resume.store';
import { ModalService } from '../../services/modal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './settings-modal.component.html',
  styleUrl: './settings-modal.component.scss',
})
export class SettingsModalComponent implements OnInit {
  store = inject(ResumeAnalysisStore);
  modalService = inject(ModalService);
  apiKey = '';
  userName = '';

  constructor() {
    this.apiKey = this.store.apiKey();
  }

  ngOnInit() {
    this.apiKey = this.store.apiKey();
    this.userName = this.store.userName();
  }

  save() {
    this.store.setAPIKey(this.apiKey);
    this.store.setUserName(this.userName);
    this.modalService.close();
  }

  clearApiKey() {
    this.apiKey = '';
  }

  closeModal() {
    this.modalService.close();
  }
}
