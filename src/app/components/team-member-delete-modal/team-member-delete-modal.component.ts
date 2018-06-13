import { Component, Input, OnInit } from '@angular/core';
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { UserTeam } from "../../services/resources/userteam.resource";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-team-member-delete-modal',
  templateUrl: './team-member-delete-modal.component.html',
  styleUrls: [
    './team-member-delete-modal.component.scss',
  ]
})
export class TeamMemberDeleteModalComponent implements OnInit {

  @Input() userTeam: ResourceModel<UserTeam> = null;

  constructor(private activeModal: NgbActiveModal,) { }

  ngOnInit() {
  }

  confirmAction() {
    this.userTeam.$remove().$promise
      .then(() => {
        this.activeModal.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  closeAction(reason: string) {
    this.activeModal.dismiss(reason);
  }

}
