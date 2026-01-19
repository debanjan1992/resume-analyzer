import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';

@Component({
  selector: 'app-modal-outlet',
  standalone: true,
  imports: [CommonModule, GenericModalComponent],
  template: `
    @if (modalService.activeModal(); as modal) {
      <app-generic-modal
        [isOpen]="true"
        [title]="modal.options?.title || ''"
        (closeEvent)="close()"
      >
        <ng-container
          *ngComponentOutlet="modal.component; inputs: modal.inputs"
        ></ng-container>
      </app-generic-modal>
    }
  `,
})
export class ModalOutletComponent {
  modalService = inject(ModalService);

  close() {
    this.modalService.close();
  }
}
