import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ResumeAnalysisStore, HistoryEntry } from '../resume.store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, TranslateModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  store = inject(ResumeAnalysisStore);
  history: HistoryEntry[] = [];

  // Stats
  totalScans = 0;
  avgScoreImprovement = 0; // Mocked for now or calculated if possible
  uniqueRoles = 0;

  // UI Helpers
  Math = Math;

  ngOnInit() {
    this.history = JSON.parse(
      localStorage.getItem('resume-analysis-history') || '[]',
    );
    this.calculateStats();
  }

  calculateStats() {
    this.totalScans = this.history.length;

    // Calculate unique roles
    const roles = new Set(
      this.history.map((h) => h.analysisResult.targetRole).filter((r) => !!r),
    );
    this.uniqueRoles = roles.size;

    // Avg Score Improvement (Mock logic: assuming previous average was 24% lower? Or just hardcode for demo if no "improvement" data exists)
    // For real app, we'd compare against previous versions of same resume.
    // Here we'll just show 'N/A' or a placeholder if we can't calculate improvement.
    // Let's just calculate Average Score for now instead of "Improvement" or check if multiple entries exist for same role.
    const totalScore = this.history.reduce(
      (acc, curr) => acc + curr.analysisResult.overallScore,
      0,
    );
    this.avgScoreImprovement =
      this.totalScans > 0 ? Math.round(totalScore / this.totalScans) : 0;
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
      this.calculateStats();
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

  getTimeAgo(date: string | Date | number): string {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000,
    );
    let interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
  }
}
