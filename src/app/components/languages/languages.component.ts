import { Component, OnInit } from '@angular/core';

import { ActiveFilterService, Filter } from '../../services/navigation/activeFilter.service';
import { LanguageResource, Language } from '../../services/resources/language.resource';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';


@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  activeFilter: Filter;

  languages: ResourceModel<Language>[] = [];

  constructor(private languageResource: LanguageResource,
              private activeFilterService: ActiveFilterService) {
  }

  ngOnInit() {
    this.activeFilterService.filterUpdated.subscribe((filter) => {
      this.activeFilter = filter;
    });

    this.languageResource.query({}).$promise
      .then((data) => {
        this.languages = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateActiveFilter(value: number) {
    this.activeFilterService.updateFilter('languages', value);
  }

}
