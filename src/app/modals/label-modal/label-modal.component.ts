import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { mapFormErrors } from 'ngx-anx-forms';
import { ToastrService } from 'ngx-toastr';
import { ScopeModel } from '../../state/scope/scope.model';
import { ScopeState } from '../../state/scope/scope.state';
import { Team, Label, LabelService } from '@snypy/rest-client';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-label-modal',
  templateUrl: './label-modal.component.html',
  styleUrls: ['./label-modal.component.scss'],
})
export class LabelModalComponent implements OnInit {
  @Input() label: Label = null;

  labelForm: UntypedFormGroup;

  @SelectSnapshot(ScopeState)
  public scope: ScopeModel;

  constructor(private activeModal: NgbActiveModal, private labelService: LabelService, private toastr: ToastrService) {}

  ngOnInit(): void {
    const scope = this.scope;

    /**
     * Label form
     *
     * @type {FormGroup}
     */
    this.labelForm = new UntypedFormGroup({
      id: new UntypedFormControl(null, null),
      labelRequest: new UntypedFormGroup({
        name: new UntypedFormControl('', Validators.required),
        team: new UntypedFormControl(null, null),
      }),
    });

    /**
     * Set team value from scope
     */
    if (scope.area == 'team') {
      const team = scope.value as Team;
      this.labelForm.get('labelRequest.team').setValue(team.pk);
    }

    /**
     * Load data from given label
     */
    if (this.label) {
      this.labelForm.get('id').setValue(this.label.pk);
      this.labelForm.get('labelRequest.name').setValue(this.label.name);
    }
  }

  confirmAction(): void {
    let promise, message, errorMessage;

    if (this.label) {
      promise = firstValueFrom(this.labelService.labelUpdate(this.labelForm.value));
      message = 'Label updated!';
      errorMessage = 'Cannot update label!';
    } else {
      promise = firstValueFrom(this.labelService.labelCreate(this.labelForm.value));
      message = 'Label added!';
      errorMessage = 'Cannot add label!';
    }

    promise
      .then(data => {
        this.toastr.success(message);
        this.activeModal.close(data);
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(errorMessage);
        mapFormErrors(this.labelForm, error.error);
      });
  }

  closeAction(reason: string): void {
    this.activeModal.dismiss(reason);
  }
}
