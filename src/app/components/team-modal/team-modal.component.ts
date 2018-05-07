import { Component, OnInit, Input } from '@angular/core';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Team, TeamResource } from '../../services/resources/team.resource';


@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit {

  @Input() team: ResourceModel<Team> = null;

  teamForm: FormGroup;

  constructor(private activeModal: NgbActiveModal,
              private teamResource: TeamResource) { }

  ngOnInit() {
    this.teamForm = new FormGroup({
      'pk': new FormControl(null, null),
      'name': new FormControl(null, Validators.required),
    });

    if (this.team) {
      this.teamForm.get('pk').setValue(this.team.pk);
      this.teamForm.get('name').setValue(this.team.name);
    }
  }

  confirmAction() {
    let promise;

    if (this.team) {
      promise = this.teamResource.update({}, this.teamForm.value).$promise;
    } else {
      promise = this.teamResource.save({}, this.teamForm.value).$promise;
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
