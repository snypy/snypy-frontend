import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Team } from '@snypy/rest-client';
import { mapFormErrors } from 'ngx-anx-forms';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { ToastrService } from 'ngx-toastr';
import { User, UserResource } from '../../services/resources/user.resource';
import { ROLES, UserTeam, UserTeamResource } from '../../services/resources/userteam.resource';
import { ScopeModel } from '../../state/scope/scope.model';
import { ScopeState } from '../../state/scope/scope.state';

@Component({
  selector: 'app-team-member-modal',
  templateUrl: './team-member-modal.component.html',
  styleUrls: ['./team-member-modal.component.scss'],
})
export class TeamMemberModalComponent implements OnInit {
  @Input() userTeam: ResourceModel<UserTeam> = null;

  userTeamForm: FormGroup;
  users: ResourceModel<User>[] = [];

  roles = [
    { pk: ROLES.SUBSCRIBER, label: 'Subscriber' },
    { pk: ROLES.CONTRIBUTOR, label: 'Contributor' },
    { pk: ROLES.EDITOR, label: 'Editor' },
  ];

  @SelectSnapshot(ScopeState)
  public scope: ScopeModel;

  constructor(
    private activeModal: NgbActiveModal,
    private userResource: UserResource,
    private userTeamResource: UserTeamResource,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const scope = this.scope;

    if (scope.area == 'team') {
      const team = scope.value as Team;

      this.userTeamForm = new FormGroup({
        pk: new FormControl(null, null),
        user: new FormControl(null, Validators.required),
        team: new FormControl(team.pk, Validators.required),
        role: new FormControl(null, Validators.required),
      });

      if (this.userTeam) {
        this.userTeamForm.get('pk').setValue(this.userTeam.pk);
        this.userTeamForm.get('user').setValue(this.userTeam.user);
        this.userTeamForm.get('role').setValue(this.userTeam.role);
      }

      this.userResource
        .query({ exclude_team: scope.value })
        .$promise.then(data => {
          this.users = data;
        })
        .catch(reason => {
          console.log('Cannot load users!');
          console.log(reason);
        });
    } else {
      console.log("Invalid scope loaded, should be 'team'");
    }
  }

  confirmAction(): void {
    let promise, message, errorMessage;

    if (this.userTeam) {
      promise = this.userTeamResource.update({}, this.userTeamForm.value).$promise;
      message = 'Team member updated!';
      errorMessage = 'Cannot update team member!';
    } else {
      promise = this.userTeamResource.save({}, this.userTeamForm.value).$promise;
      message = 'Team member updated!';
      errorMessage = 'Cannot add team member!';
    }

    promise
      .then(data => {
        this.toastr.success(message);
        this.activeModal.close(data);
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(errorMessage);
        mapFormErrors(this.userTeamForm, error.error);
      });
  }

  closeAction(reason: string): void {
    this.activeModal.dismiss(reason);
  }
}
