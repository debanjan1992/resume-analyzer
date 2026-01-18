import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ResumeAnalysisStore } from '../../resume.store';
import { inject } from '@angular/core';

import { SettingsModalComponent } from '../settings-modal/settings-modal.component';

@Component({
  selector: 'app-header',
  imports: [
    TranslateModule,
    RouterLink,
    RouterLinkActive,
    SettingsModalComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  store = inject(ResumeAnalysisStore);
  translate = inject(TranslateService);
  isSettingsOpen = false;

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }
}
