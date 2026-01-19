import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  private nextId = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = this.nextId++;
    const toast: Toast = { message, type, id };

    this.toastsSignal.update((toasts) => [...toasts, toast]);

    setTimeout(() => this.remove(id), 5000); // Auto remove after 5 seconds
  }

  remove(id: number) {
    this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
  }
}
