import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ResumeAnalysisStore, HistoryEntry } from '../resume.store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, TranslateModule],
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  store = inject(ResumeAnalysisStore);
  history: HistoryEntry[] = [];

  ngOnInit() {
    this.history = JSON.parse(
      localStorage.getItem('resume-analysis-history') || '[]',
    );
  }

  loadEntry(entry: HistoryEntry) {
    this.store.loadHistoryEntry(entry);
  }

  deleteEntry(event: Event, id: string) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this analysis?')) {
      this.history = this.history.filter((h) => h.id !== id);
      localStorage.setItem(
        'resume-analysis-history',
        JSON.stringify(this.history),
      );
    }
  }

  getStatus(score: number): { label: string; class: string } {
    if (score >= 80) {
      return {
        label: 'HISTORY.STATUS.GOOD',
        class: 'bg-green-100 text-green-700',
      };
    } else if (score >= 50) {
      return {
        label: 'HISTORY.STATUS.NEEDS_WORK',
        class: 'bg-orange-100 text-orange-700',
      };
    } else {
      return {
        label: 'HISTORY.STATUS.CRITICAL',
        class: 'bg-red-100 text-red-700',
      };
    }
  }
}
