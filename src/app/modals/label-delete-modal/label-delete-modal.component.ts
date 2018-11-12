import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { Label } from "../../services/resources/label.resource";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-label-delete-modal',
  templateUrl: './label-delete-modal.component.html',
  styleUrls: ['./label-delete-modal.component.scss']
})
export class LabelDeleteModalComponent implements OnInit {

  @Input() label: ResourceModel<Label> = null;

  constructor(private activeModal: NgbActiveModal,
              private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  confirmAction() {
    this.label.$remove().$promise
      .then((data) => {
        this.toastr.success("Label deleted!");
        this.activeModal.close();
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error("Cannot delete label!");
      });
  }

  closeAction(reason: string) {
    this.activeModal.dismiss(reason);
  }
}
