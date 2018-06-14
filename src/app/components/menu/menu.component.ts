import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActiveFilterService, Filter } from '../../services/navigation/activeFilter.service';
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  activeFilter: Filter;
  navigations = [
    {
      name: 'All snippets',
      value: 'all',
      icon: 'globe'
    },
    {
      name: 'Favorites',
      value: 'favorites',
      icon: 'star'
    },
    {
      name: 'Unlabeled',
      value: 'unlabeled',
      icon: 'tag'
    },
    {
      name: 'Public',
      value: 'public',
      icon: 'eye'
    },
    {
      name: 'Private',
      value: 'private',
      icon: 'eye-slash'
    },

    /*
    ToDo: Enable after share options are available in REST API
    {
      name: 'Shared by me',
      value: 'shared-by-me',
      icon: 'cloud-upload-alt'
    },
    {
      name: 'Shared with me',
      value: 'shared-with-me',
      icon: 'cloud-download-alt'
    }
    */
  ];

  activeFilterSubscription: Subscription;

  constructor(private activeFilterService: ActiveFilterService) { }

  ngOnInit() {
    this.activeFilterSubscription = this.activeFilterService.filterUpdated.subscribe((filter) => {
      this.activeFilter = filter;
    });
  }

  updateActiveFilter(value: string) {
    this.activeFilterService.updateFilter('main', value);
  }

  ngOnDestroy() {
    this.activeFilterSubscription.unsubscribe();
  }
}
