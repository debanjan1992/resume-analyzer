import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { AtsScoreComponent } from './cards/ats-score/ats-score.component';
import { ScoreBreakdownComponent } from './cards/score-breakdown/score-breakdown.component';
import { QuickWinsComponent } from './cards/quick-winds/quick-wins.component';
import { JdMatchComponent } from './cards/jd-match/jd-match.component';
import { ResumeAnalysisStore } from '../resume.store';
import { ImpactLanguageComponent } from "./cards/impact-language/impact-language.component";
import { SoftSkillsComponent } from "./cards/soft-skills/soft-skills.component";
import { StructureCheckComponent } from "./cards/structure-check/structure-check.component";
import { QuantifiableImpactComponent } from "./cards/quantifiable-impact/quantifiable-impact.component";
import { RecommendationsComponent } from './cards/recommendations/recommendations.component';
import { CriticalFixesComponent } from "./cards/critical-fixes/critical-fixes.component";
import { Router, RouterLink } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
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
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  store = inject(ResumeAnalysisStore);
  router = inject(Router);
  date = new Date();

  constructor() {
    effect(() => {
      if (this.store.analysisResult() === null) {
        this.router.navigate(['/']);
      }
    });
  }
}
