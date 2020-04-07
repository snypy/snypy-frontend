import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActiveFilterService, Filter } from '../../services/navigation/activeFilter.service';
import { Language } from '../../services/resources/language.resource';
import { Subscription } from "rxjs";
import { SelectSnapshot } from "@ngxs-labs/select-snapshot";
import { LanguageState } from "../../state/language/language.state";


@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit, OnDestroy {

  activeFilter: Filter;

  activeFilterSubscription: Subscription;
  availableLanguagesSubscription: Subscription;

  @SelectSnapshot(LanguageState)
  public languages: Language[];

  constructor(private activeFilterService: ActiveFilterService) {
  }

  ngOnInit() {
    this.activeFilterSubscription = this.activeFilterService.filterUpdated.subscribe((filter) => {
      this.activeFilter = filter;
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
