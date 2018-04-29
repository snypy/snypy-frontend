import { Component, OnInit, Input } from '@angular/core';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Label, LabelResource } from '../../services/resources/label.resource';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-label-modal',
  templateUrl: './label-modal.component.html',
  styleUrls: ['./label-modal.component.scss']
})
export class LabelModalComponent implements OnInit {

  @Input() label: ResourceModel<Label> = null;

  currentUser = 1;
  labelForm: FormGroup;

  constructor(private activeModal: NgbActiveModal,
              private labelResource: LabelResource) { }

  ngOnInit() {

    this.labelForm = new FormGroup({
      'pk': new FormControl(null, null),
      'name': new FormControl(null, Validators.required),
    });

    if (this.label) {
      this.labelForm.get('pk').setValue(this.label.pk);
      this.labelForm.get('name').setValue(this.label.name);
    }

  }

  confirmAction() {
    let promise;

    if (this.label) {
      promise = this.labelResource.update({}, this.labelForm.value).$promise;
    } else {
      promise = this.labelResource.save({}, this.labelForm.value).$promise;
    }

    promise
      .then((data) => {
        this.activeModal.close(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  closeAction(reason: string) {
    this.activeModal.dismiss(reason);
  }

}
