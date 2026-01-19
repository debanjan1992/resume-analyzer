import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AtsScoreComponent } from './cards/ats-score/ats-score.component';
import { ScoreBreakdownComponent } from './cards/score-breakdown/score-breakdown.component';
import { QuickWinsComponent } from './cards/quick-winds/quick-wins.component';
import { JdMatchComponent } from './cards/jd-match/jd-match.component';
import { ResumeAnalysisStore } from '../resume.store';
import { ImpactLanguageComponent } from './cards/impact-language/impact-language.component';
import { SoftSkillsComponent } from './cards/soft-skills/soft-skills.component';
import { StructureCheckComponent } from './cards/structure-check/structure-check.component';
import { QuantifiableImpactComponent } from './cards/quantifiable-impact/quantifiable-impact.component';
import { RecommendationsComponent } from './cards/recommendations/recommendations.component';
import { CriticalFixesComponent } from './cards/critical-fixes/critical-fixes.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-analysis',
  imports: [
    AtsScoreComponent,
    ScoreBreakdownComponent,
    QuickWinsComponent,
    JdMatchComponent,
    ImpactLanguageComponent,
    SoftSkillsComponent,
    StructureCheckComponent,
    QuantifiableImpactComponent,
    RecommendationsComponent,
    CriticalFixesComponent,
    RouterLink,
    DatePipe,
    TranslateModule,
  ],
  templateUrl: './analysis.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Analysis {
  store = inject(ResumeAnalysisStore);
  router = inject(Router);
  route = inject(ActivatedRoute);
  date = new Date();

  constructor() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.store.loadAnalysisById(id);
      }
    });
  }

  downloadReport() {
    window.print();
  }
}
