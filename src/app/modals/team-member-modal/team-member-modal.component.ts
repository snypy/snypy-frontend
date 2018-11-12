import { Component, Input, OnInit } from '@angular/core';
import { ROLES, UserTeam, UserTeamResource } from "../../services/resources/userteam.resource";
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ActiveScopeService } from "../../services/navigation/activeScope.service";
import { User, UserResource } from "../../services/resources/user.resource";
import { Team } from "../../services/resources/team.resource";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-team-member-modal',
  templateUrl: './team-member-modal.component.html',
  styleUrls: [
    './team-member-modal.component.scss',
  ]
})
export class TeamMemberModalComponent implements OnInit {

  @Input() userTeam: ResourceModel<UserTeam> = null;

  userTeamForm: FormGroup;
  users: ResourceModel<User>[] = [];

  roles = [
    {pk: ROLES.SUBSCRIBER, label: 'Subscriber'},
    {pk: ROLES.CONTRIBUTOR, label: 'Contributor'},
    {pk: ROLES.EDITOR, label: 'Editor'},
  ];

  constructor(private activeModal: NgbActiveModal,
              private userResource: UserResource,
              private userTeamResource: UserTeamResource,
              private activeScopeService: ActiveScopeService,
              private toastr: ToastrService) { }

  ngOnInit() {
    let scope = this.activeScopeService.getScope();

    if (scope.area == 'team') {
      let team = scope.value as ResourceModel<Team>;

      this.userTeamForm = new FormGroup({
        'pk': new FormControl(null, null),
        'user': new FormControl(null, Validators.required),
        'team': new FormControl(team.pk, Validators.required),
        'role': new FormControl(team.pk, Validators.required),
      });

      if (this.userTeam) {
        this.userTeamForm.get('pk').setValue(this.userTeam.pk);
        this.userTeamForm.get('user').setValue(this.userTeam.user);
        this.userTeamForm.get('role').setValue(this.userTeam.role);
      }

      this.userResource.query({exclude_team: scope.value}).$promise
        .then((data) => {
          this.users = data;
        })
        .catch((reason) => {
          console.log("Cannot load users!");
          console.log(reason);
        });
    } else {
      console.log("Invalid scope loaded, should be 'team'");
    }
  }

  confirmAction() {
    let promise, message, errorMessage;

    if (this.userTeam) {
      promise = this.userTeamResource.update({}, this.userTeamForm.value).$promise;
      message = "Team member updated!";
      errorMessage = "Cannot update team member!";
    } else {
      promise = this.userTeamResource.save({}, this.userTeamForm.value).$promise;
      message = "Team member updated!";
      errorMessage = "Cannot update team member!";
    }

    promise
      .then((data) => {
        this.toastr.success(message);
        this.activeModal.close(data);
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(errorMessage);
      });
  }

  closeAction(reason: string) {
    this.activeModal.dismiss(reason);
  }

}
