import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalService } from '../services/modal.service';
import { SettingsModalComponent } from '../components/settings-modal/settings-modal.component';
import { InputPanel } from '../components/input-panel/input-panel';
import { ResumeAnalysisStore } from '../resume.store';
import { AnalysisInProgress } from '../components/analysis-in-progress/analysis-in-progress';
import { Hero } from '../components/hero/hero';

@Component({
  selector: 'app-home',
  imports: [InputPanel, AnalysisInProgress, Hero, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  store = inject(ResumeAnalysisStore);
  modalService = inject(ModalService);
  private translate = inject(TranslateService);

  openSettings() {
    this.modalService.open(
      SettingsModalComponent,
      {},
      { title: this.translate.instant('SETTINGS.TITLE') },
    );
  }
}
