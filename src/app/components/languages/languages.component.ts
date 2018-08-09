import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActiveFilterService, Filter } from '../../services/navigation/activeFilter.service';
import { Language } from '../../services/resources/language.resource';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { AvailableLanguagesService } from '../../services/navigation/availableLanguages.service';
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit, OnDestroy {

  activeFilter: Filter;

  languages: ResourceModel<Language>[] = [];

  activeFilterSubscription: Subscription;
  availableLanguagesSubscription: Subscription;

  constructor(private availableLanguagesService: AvailableLanguagesService,
              private activeFilterService: ActiveFilterService) {
  }

  ngOnInit() {
    this.activeFilterSubscription = this.activeFilterService.filterUpdated.subscribe((filter) => {
      this.activeFilter = filter;
    });

    this.availableLanguagesSubscription = this.availableLanguagesService.languagesUpdated.subscribe((data) => {
      this.languages = data;
    });
  }

  updateActiveFilter(value: number) {
    this.activeFilterService.updateFilter('languages', value);
  }

  ngOnDestroy() {
    this.activeFilterSubscription.unsubscribe();
    this.availableLanguagesSubscription.unsubscribe();
  }
}
