import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ResumeAnalysisStore } from '../../resume.store';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-name-input-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './name-input-modal.component.html',
})
export class NameInputModalComponent {
  store = inject(ResumeAnalysisStore);
  router = inject(Router);
  modalService = inject(ModalService);
  translate = inject(TranslateService);

  userName = '';
  nameError = '';

  close() {
    this.modalService.close();
  }

  submitName() {
    if (!this.userName.trim()) {
      this.nameError = 'INPUT.NAME_MODAL.ERROR_REQUIRED';
      return;
    }

    this.store.setUserName(this.userName);
    this.close();
    this.router.navigate(['/editor']);
  }
}
