import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ResumeAnalysisStore } from '../../resume.store';
import { ModalService } from '../../services/modal.service';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  store = inject(ResumeAnalysisStore);
  translate = inject(TranslateService);
  modalService = inject(ModalService);

  userInitials = computed(() => {
    const name = this.store.userName() || 'John Doe';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  });

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  toggleSettings() {
    this.modalService.open(SettingsModalComponent, {}, { title: 'Settings' });
  }
}
