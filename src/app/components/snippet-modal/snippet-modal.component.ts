import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

import { SnippetResource, Snippet } from '../../services/resources/snippet.resource';
import { Label } from '../../services/resources/label.resource';
import { Language } from '../../services/resources/language.resource';
import { AvailableLanguagesService } from '../../services/navigation/availableLanguages.service';
import { AvailableLabelsService } from '../../services/navigation/availableLabels.service';


@Component({
  selector: 'app-snippet-modal',
  templateUrl: './snippet-modal.component.html',
  styleUrls: ['./snippet-modal.component.scss']
})
export class SnippetModalComponent implements OnInit {

  @Input() snippet: ResourceModel<Snippet> = null;

  currentUser = 1;
  languages: ResourceModel<Language>[] = [];
  labels: ResourceModel<Label>[] = [];

  snippetForm: FormGroup;

  constructor(private activeModal: NgbActiveModal,
              private availableLabelsService: AvailableLabelsService,
              private availableLanguagesService: AvailableLanguagesService,
              private snippetResource: SnippetResource) { }

  ngOnInit() {
    this.labels = this.availableLabelsService.labels;

    this.availableLanguagesService.languagesPromise
      .then((data) => {
        this.languages = data;
      })
      .catch((error) => {
        console.log(error);
      });

    this.snippetForm = new FormGroup({
      'pk': new FormControl(null, null),
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null),
      'labels': new FormControl([]),
    });

    if (this.snippet) {
      this.snippetForm.get('pk').setValue(this.snippet.pk);
      this.snippetForm.get('title').setValue(this.snippet.title);
      this.snippetForm.get('description').setValue(this.snippet.description);
      this.snippetForm.get('labels').setValue(this.snippet.labels);
    }

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
    let promise;

    if (this.snippet) {
      promise = this.snippetResource.update({}, this.snippetForm.value).$promise;
    } else {
      promise = this.snippetResource.save({}, this.snippetForm.value).$promise;
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
