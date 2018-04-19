import { Component, OnInit } from '@angular/core';

import { LanguageResource, Language } from '../../services/resources/language.resource';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  languages: ResourceModel<Language>[] = [];

  constructor(private languageResource: LanguageResource) {
  }

  ngOnInit() {
    this.languageResource.query({}).$promise
      .then((data) => {
        this.languages = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
