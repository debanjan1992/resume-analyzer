import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="pointer-events-auto min-w-[300px] p-4 rounded-xl shadow-lg border flex items-center justify-between gap-4 animate-slide-in"
          [ngClass]="{
            'bg-green-50 border-green-200 text-green-800':
              toast.type === 'success',
            'bg-red-50 border-red-200 text-red-800': toast.type === 'error',
            'bg-blue-50 border-blue-200 text-blue-800': toast.type === 'info',
          }"
        >
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined">
              {{
                toast.type === 'success'
                  ? 'check_circle'
                  : toast.type === 'error'
                    ? 'error'
                    : 'info'
              }}
            </span>
            <p class="text-sm font-medium">{{ toast.message }}</p>
          </div>
          <button
            (click)="toastService.remove(toast.id)"
            class="text-current opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span class="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .animate-slide-in {
        animation: slideIn 0.3s ease-out forwards;
      }
    `,
  ],
})
export class ToastComponent {
  toastService = inject(ToastService);
}
