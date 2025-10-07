import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActiveFilterService, Filter } from '../../services/navigation/activeFilter.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: false,
})
export class MenuComponent implements OnInit, OnDestroy {
  activeFilter: Filter;
  navigations = [
    {
      name: 'All snippets',
      value: 'all',
      icon: 'globe',
    },
    {
      name: 'Unlabeled',
      value: 'unlabeled',
      icon: 'tag',
    },
    {
      name: 'Favorites',
      value: 'favorites',
      icon: 'star',
    },
    {
      name: 'Public',
      value: 'public',
      icon: 'eye',
    },
    {
      name: 'Private',
      value: 'private',
      icon: 'eye-slash',
    },

    /*
    ToDo: Implement in 1.1
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

  constructor(private activeFilterService: ActiveFilterService) {}

  ngOnInit(): void {
    this.activeFilterSubscription = this.activeFilterService.filterUpdated.subscribe(filter => {
      this.activeFilter = filter;
    });
  }

  updateActiveFilter(value: string): void {
    this.activeFilterService.updateFilter('main', value);
  }

  ngOnDestroy(): void {
    this.activeFilterSubscription.unsubscribe();
  }
}
