import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

import { SnippetResource, Snippet } from '../../services/resources/snippet.resource';
import { Label } from '../../services/resources/label.resource';
import { Language } from '../../services/resources/language.resource';
import { Team } from "../../services/resources/team.resource";
import { ToastrService } from "ngx-toastr";
import { mapFormErrors } from "ngx-anx-forms";
import { SelectSnapshot } from "@ngxs-labs/select-snapshot";
import { ScopeState } from "../../state/scope/scope.state";
import { ScopeModel } from "../../state/scope/scope.model";
import { UpdateLanguages } from "../../state/language/language.actions";
import { Store } from "@ngxs/store";
import { LanguageState } from "../../state/language/language.state";
import { UpdateLabels } from "../../state/label/label.actions";
import { LabelState } from "../../state/label/label.state";


@Component({
  selector: 'app-snippet-modal',
  templateUrl: './snippet-modal.component.html',
  styleUrls: ['./snippet-modal.component.scss']
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

  constructor(private activeModal: NgbActiveModal,
              private snippetResource: SnippetResource,
              private toastr: ToastrService,
              private store: Store,) {
  }

  ngOnInit() {
    /**
     * Setup snippet from
     *
     * @type {FormGroup}
     */
    this.snippetForm = new FormGroup({
      'pk': new FormControl(null),
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'labels': new FormControl([]),
      'visibility': new FormControl('PRIVATE'),
      'team': new FormControl(null),
    });

    /**
     * Set team value from scope
     */
    if (this.scope.area == 'team') {
      let team = this.scope.value as ResourceModel<Team>;
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
            'pk': new FormControl(snippetFile.pk),
            'name': new FormControl(snippetFile.name),
            'language': new FormControl(snippetFile.language),
            'content': new FormControl(snippetFile.content),
          })
        );
      }

      this.snippetForm.addControl('files', files);
    } else {
      this.snippetForm.addControl('files', new FormArray([]));
    }

  }

  removeFile(index: number) {
    (<FormArray>this.snippetForm.get('files')).removeAt(index);
  }

  addFile() {
    (<FormArray>this.snippetForm.get('files')).push(
      new FormGroup({
        'name': new FormControl(null),
        'language': new FormControl(null),
        'content': new FormControl(null),
      })
    );
  }

  confirmAction() {
    let promise, message, errorMessage;

    if (this.snippet) {
      promise = this.snippetResource.update({}, this.snippetForm.value).$promise;
      message = "Snippet updated!";
      errorMessage = "Cannot update snippet!";
    } else {
      promise = this.snippetResource.save({}, this.snippetForm.value).$promise;
      message = "Snippet added!";
      errorMessage = "Cannot add snippet!";
    }

    promise
      .then((data) => {
        this.store.dispatch(new UpdateLabels());
        this.store.dispatch(new UpdateLanguages());

        this.toastr.success(message);
        this.activeModal.close(data);
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(errorMessage);
        mapFormErrors(this.snippetForm, error.error);
      });
  }

  closeAction(reason: string) {
    this.activeModal.dismiss(reason);
  }
}
