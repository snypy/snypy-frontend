import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Store } from '@ngxs/store';
import { Team } from '@snypy/rest-client';
import { mapFormErrors } from 'ngx-anx-forms';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { ToastrService } from 'ngx-toastr';
import { Label } from '../../services/resources/label.resource';
import { Language } from '../../services/resources/language.resource';
import { Snippet, SnippetResource } from '../../services/resources/snippet.resource';
import { UpdateLabels } from '../../state/label/label.actions';
import { LabelState } from '../../state/label/label.state';
import { UpdateLanguages } from '../../state/language/language.actions';
import { LanguageState } from '../../state/language/language.state';
import { ScopeModel } from '../../state/scope/scope.model';
import { ScopeState } from '../../state/scope/scope.state';
import { SetActiveSnippet } from '../../state/snippet/snippet.actions';

@Component({
  selector: 'app-snippet-modal',
  templateUrl: './snippet-modal.component.html',
  styleUrls: ['./snippet-modal.component.scss'],
})
export class SnippetModalComponent implements OnInit {
  @Input() snippet: ResourceModel<Snippet> = null;

  snippetForm: FormGroup;

  @SelectSnapshot(ScopeState)
  public scope: ScopeModel;

  @SelectSnapshot(LanguageState)
  public languages: Language[];

  @SelectSnapshot(LabelState)
  public labels: Label[];

  public visibilities = [
    {
      key: 'PRIVATE',
      name: 'Private',
    },
    {
      key: 'PUBLIC',
      name: 'Public',
    },
  ];

  constructor(
    private activeModal: NgbActiveModal,
    private snippetResource: SnippetResource,
    private toastr: ToastrService,
    private store: Store
  ) {}

  ngOnInit(): void {
    /**
     * Setup snippet from
     *
     * @type {FormGroup}
     */
    this.snippetForm = new FormGroup({
      pk: new FormControl(null),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      labels: new FormControl([]),
      visibility: new FormControl('PRIVATE'),
      team: new FormControl(null),
    });

    /**
     * Set team value from scope
     */
    if (this.scope.area == 'team') {
      const team = this.scope.value as Team;
      this.snippetForm.get('team').setValue(team.pk);
    }

    /**
     * Set snippet values from given snippet
     */
    if (this.snippet) {
      this.snippetForm.get('pk').setValue(this.snippet.pk);
      this.snippetForm.get('title').setValue(this.snippet.title);
      this.snippetForm.get('description').setValue(this.snippet.description);
      this.snippetForm.get('labels').setValue(this.snippet.labels);
      this.snippetForm.get('visibility').setValue(this.snippet.visibility);
      this.snippetForm.get('team').setValue(this.snippet.team);
    }

    /**
     * Snippet files
     */
    if (this.snippet) {
      const files = new FormArray([]);
      for (const snippetFile of this.snippet.files) {
        files.push(
          new FormGroup({
            pk: new FormControl(snippetFile.pk),
            name: new FormControl(snippetFile.name),
            language: new FormControl(snippetFile.language),
            content: new FormControl(snippetFile.content),
          })
        );
      }

      this.snippetForm.addControl('files', files);
    } else {
      this.snippetForm.addControl('files', new FormArray([]));
    }
  }

  removeFile(index: number): void {
    (<FormArray>this.snippetForm.get('files')).removeAt(index);
  }

  addFile(): void {
    (<FormArray>this.snippetForm.get('files')).push(
      new FormGroup({
        name: new FormControl(null),
        language: new FormControl(null),
        content: new FormControl(null),
      })
    );
  }

  confirmAction(closeModal: boolean): void {
    let promise, message, errorMessage;

    if (this.snippet) {
      promise = this.snippetResource.update({}, this.snippetForm.value).$promise;
      message = 'Snippet updated!';
      errorMessage = 'Cannot update snippet!';
    } else {
      promise = this.snippetResource.save({}, this.snippetForm.value).$promise;
      message = 'Snippet added!';
      errorMessage = 'Cannot add snippet!';
    }

    promise
      .then(data => {
        this.store.dispatch(new UpdateLabels());
        this.store.dispatch(new UpdateLanguages());
        this.store.dispatch(new SetActiveSnippet(data));

        this.toastr.success(message);
        if (closeModal) this.activeModal.close(data);
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(errorMessage);
        mapFormErrors(this.snippetForm, error.error);
      });
  }

  closeAction(reason: string): void {
    this.activeModal.dismiss(reason);
  }
}
