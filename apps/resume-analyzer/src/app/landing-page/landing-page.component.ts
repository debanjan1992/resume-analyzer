import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ResumeAnalysisStore } from '../resume.store';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalService } from '../services/modal.service';
import { NameInputModalComponent } from '../components/name-input-modal/name-input-modal.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  store = inject(ResumeAnalysisStore);
  router = inject(Router);
  openFaqIndex: number | null = null;
  modalService = inject(ModalService);
  translate = inject(TranslateService);

  toggleFaq(index: number) {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  openNameModal() {
    if (this.store.userName()) {
      this.router.navigate(['/editor']);
      return;
    }

    this.modalService.open(
      NameInputModalComponent,
      {},
      { title: this.translate.instant('INPUT.NAME_MODAL.TITLE') },
    );
  }
}
