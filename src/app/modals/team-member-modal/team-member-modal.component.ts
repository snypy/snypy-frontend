import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Team } from '@snypy/rest-client';
import { ToastrService } from 'ngx-toastr';
import { ScopeModel } from '../../state/scope/scope.model';
import { ScopeState } from '../../state/scope/scope.state';
import { UserTeam, UserteamService, RoleEnum } from '@snypy/rest-client';
import { firstValueFrom } from 'rxjs';
import { UserService, User } from '@snypy/rest-client';
import { mapFormErrors } from '../../helpers/form-error-mapper';

@Component({
  selector: 'app-team-member-modal',
  templateUrl: './team-member-modal.component.html',
  styleUrls: ['./team-member-modal.component.scss'],
  standalone: false,
})
export class TeamMemberModalComponent implements OnInit {
  @Input() userTeam: UserTeam = null;

  userTeamForm: FormGroup;
  users: User[] = [];

  roles = [
    { pk: RoleEnum.Subscriber, label: 'Subscriber' },
    { pk: RoleEnum.Contributor, label: 'Contributor' },
    { pk: RoleEnum.Editor, label: 'Editor' },
  ];

  @SelectSnapshot(ScopeState)
  public scope: ScopeModel;

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private userteamService: UserteamService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const scope = this.scope;

    if (scope.area == 'team') {
      const team = scope.value as Team;

      this.userTeamForm = new FormGroup({
        id: new FormControl(null, null),
        userTeamRequest: new FormGroup({
          user: new FormControl(null, Validators.required),
          team: new FormControl(team.pk, Validators.required),
          role: new FormControl(null, Validators.required),
        }),
      });

      if (this.userTeam) {
        this.userTeamForm.get('id').setValue(this.userTeam.pk);
        this.userTeamForm.get('userTeamRequest.user').setValue(this.userTeam.user);
        this.userTeamForm.get('userTeamRequest.role').setValue(this.userTeam.role);
      }

      firstValueFrom(this.userService.userList({}))
        .then(data => {
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
      promise = firstValueFrom(this.userteamService.userteamUpdate(this.userTeamForm.value));
      message = 'Team member updated!';
      errorMessage = 'Cannot update team member!';
    } else {
      promise = firstValueFrom(this.userteamService.userteamCreate(this.userTeamForm.value));
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
