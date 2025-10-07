import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Label, LabelService } from '@snypy/rest-client';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-label-delete-modal',
  templateUrl: './label-delete-modal.component.html',
  styleUrls: ['./label-delete-modal.component.scss'],
  standalone: false,
})
export class LabelDeleteModalComponent {
  @Input() label: Label = null;

  constructor(
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private labelService: LabelService
  ) {}

  confirmAction(): void {
    firstValueFrom(this.labelService.labelDestroy({ id: this.label.pk }))
      .then(() => {
        this.toastr.success('Label deleted!');
        this.activeModal.close();
      })
      .catch(error => {
        console.log(error);
        this.toastr.error('Cannot delete label!');
      });
  }

  closeAction(reason: string): void {
    this.activeModal.dismiss(reason);
  }
}
