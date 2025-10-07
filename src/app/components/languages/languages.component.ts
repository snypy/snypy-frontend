import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Subscription } from 'rxjs';
import { ActiveFilterService, Filter } from '../../services/navigation/activeFilter.service';
import { Language } from '@snypy/rest-client';
import { LanguageState } from '../../state/language/language.state';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  standalone: false,
})
export class LanguagesComponent implements OnInit, OnDestroy {
  activeFilter: Filter;

  activeFilterSubscription: Subscription;

  @SelectSnapshot(LanguageState)
  public languages: Language[];

  constructor(private activeFilterService: ActiveFilterService) {}

  ngOnInit(): void {
    this.activeFilterSubscription = this.activeFilterService.filterUpdated.subscribe(filter => {
      this.activeFilter = filter;
    });
  }

  updateActiveFilter(value: number): void {
    this.activeFilterService.updateFilter('languages', value);
  }

  ngOnDestroy(): void {
    this.activeFilterSubscription.unsubscribe();
  }
}
