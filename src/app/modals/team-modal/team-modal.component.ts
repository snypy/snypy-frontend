import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Team, TeamService } from '@snypy/rest-client';
import { mapFormErrors } from 'ngx-anx-forms';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss'],
})
export class TeamModalComponent implements OnInit {
  @Input() team: Team = null;

  teamForm: UntypedFormGroup;

  constructor(private activeModal: NgbActiveModal, private teamService: TeamService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.teamForm = new UntypedFormGroup({
      id: new UntypedFormControl(null, null),
      teamRequest: new UntypedFormGroup({
        name: new UntypedFormControl(null, Validators.required),
      }),
    });

    if (this.team) {
      this.teamForm.get('id').setValue(this.team.pk);
      this.teamForm.get('teamRequest.name').setValue(this.team.name);
    }
  }

  confirmAction(): void {
    let promise, message, errorMessage;

    if (this.team) {
      promise = firstValueFrom(this.teamService.teamUpdate(this.teamForm.value));
      message = 'Team updated!';
      errorMessage = 'Cannot update team!';
    } else {
      promise = firstValueFrom(this.teamService.teamCreate(this.teamForm.value));
      message = 'Team updated!';
      errorMessage = 'Cannot add team!';
    }

    promise
      .then(data => {
        this.toastr.success(message);
        this.activeModal.close(data);
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(errorMessage);
        mapFormErrors(this.teamForm, error.error);
      });
  }

  closeAction(reason: string): void {
    this.activeModal.dismiss(reason);
  }
}
