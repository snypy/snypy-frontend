import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

import { SnippetResource, Snippet } from '../../services/resources/snippet.resource';
import { LabelResource, Label } from '../../services/resources/label.resource';
import { Language } from '../../services/resources/language.resource';
import { AvailableLanguagesService } from '../../services/navigation/availableLanguages.service';


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
              private labelResource: LabelResource,
              private availableLanguagesService: AvailableLanguagesService,
              private snippetResource: SnippetResource) { }

  ngOnInit() {

    this.labelResource.query({user: this.currentUser}).$promise
      .then((data) => {
        this.labels = data;
      })
      .catch((error) => {
        console.log(error);
      });

    this.availableLanguagesService.languagesPromise
      .then((data) => {
        this.languages = data;
      })
      .catch((error) => {
        console.log(error);
      });

    const file = new FormArray([]);
    for (const snippetFile of this.snippet.files) {
      file.push(
        new FormGroup({
          'pk': new FormControl(snippetFile.pk),
          'name': new FormControl(snippetFile.name),
          'language': new FormControl(snippetFile.language),
          'content': new FormControl(snippetFile.content),
        })
      );
    }

    this.snippetForm = new FormGroup({
      'pk': new FormControl(this.snippet.pk),
      'title': new FormControl(this.snippet.title, Validators.required),
      'description': new FormControl(this.snippet.description),
      'labels': new FormControl(this.snippet.labels),
      'files': file,
    });

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

    if (this.snippet.pk) {
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
