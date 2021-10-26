import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { mapFormErrors } from 'ngx-anx-forms';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { ToastrService } from 'ngx-toastr';
import { Team, TeamResource } from '../../services/resources/team.resource';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss'],
})
export class TeamModalComponent implements OnInit {
  @Input() team: ResourceModel<Team> = null;

  teamForm: FormGroup;

  constructor(private activeModal: NgbActiveModal, private teamResource: TeamResource, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.teamForm = new FormGroup({
      pk: new FormControl(null, null),
      name: new FormControl(null, Validators.required),
    });

    if (this.team) {
      this.teamForm.get('pk').setValue(this.team.pk);
      this.teamForm.get('name').setValue(this.team.name);
    }
  }

  confirmAction(): void {
    let promise, message, errorMessage;

    if (this.team) {
      promise = this.teamResource.update({}, this.teamForm.value).$promise;
      message = 'Team updated!';
      errorMessage = 'Cannot update team!';
    } else {
      promise = this.teamResource.save({}, this.teamForm.value).$promise;
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
