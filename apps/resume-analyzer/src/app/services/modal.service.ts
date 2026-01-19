import { Injectable, Type, signal } from '@angular/core';

export interface ModalOptions {
  title?: string;
  width?: string;
}

export interface ModalState {
  component: Type<any>;
  inputs?: Record<string, any>;
  options?: ModalOptions;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private activeModalSignal = signal<ModalState | null>(null);

  readonly activeModal = this.activeModalSignal.asReadonly();

  open<T>(component: Type<T>, inputs?: Partial<T>, options?: ModalOptions) {
    this.activeModalSignal.set({
      component,
      inputs,
      options,
    });
  }

  close() {
    this.activeModalSignal.set(null);
  }
}
