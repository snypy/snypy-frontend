import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { ToastrService } from 'ngx-toastr';
import { Label } from '@snypy/rest-client';

@Component({
  selector: 'app-label-delete-modal',
  templateUrl: './label-delete-modal.component.html',
  styleUrls: ['./label-delete-modal.component.scss'],
})
export class LabelDeleteModalComponent {
  @Input() label: ResourceModel<Label> = null;

  constructor(private activeModal: NgbActiveModal, private toastr: ToastrService) {}

  confirmAction(): void {
    this.label
      .$remove()
      .$promise.then(() => {
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
