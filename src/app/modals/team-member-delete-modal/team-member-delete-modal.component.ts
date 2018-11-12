import { Component, Input, OnInit } from '@angular/core';
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { UserTeam } from "../../services/resources/userteam.resource";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-team-member-delete-modal',
  templateUrl: './team-member-delete-modal.component.html',
  styleUrls: [
    './team-member-delete-modal.component.scss',
  ]
})
export class TeamMemberDeleteModalComponent implements OnInit {

  @Input() userTeam: ResourceModel<UserTeam> = null;

  constructor(private activeModal: NgbActiveModal,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  confirmAction() {
    this.userTeam.$remove().$promise
      .then(() => {
        this.toastr.success("Team deleted!");
        this.activeModal.close();
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error("Cannot delete team!");
      });
  }

  closeAction(reason: string) {
    this.activeModal.dismiss(reason);
  }

}
