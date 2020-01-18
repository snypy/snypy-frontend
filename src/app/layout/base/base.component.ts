import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveFilterService } from "../../services/navigation/activeFilter.service";
import { ActiveScopeService, Scope } from "../../services/navigation/activeScope.service";
import { AvailableLabelsService } from "../../services/navigation/availableLabels.service";
import { SnippetLoaderService } from "../../services/navigation/snippetLoader.service";
import { Subscription } from "rxjs";
import { AvailableLanguagesService } from "../../services/navigation/availableLanguages.service";
import { AuthResource } from '../../services/resources/auth.resource';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;

  activeScopeSubscription: Subscription;

  constructor(private authResource: AuthResource,
              private activeScopeService: ActiveScopeService,
              private activeFilterService: ActiveFilterService,
              private availableLabelsService: AvailableLabelsService,
              private availableLanguagesService: AvailableLanguagesService,
              private snippetLoaderService: SnippetLoaderService,) {
  }

  ngOnInit() {
    /**
     * Refresh snippets on scope changes
     */
    this.activeScopeSubscription = this.activeScopeService.scopeUpdated.subscribe((scope: Scope) => {
      if (scope.area) {
        this.snippetLoaderService.activeSnippet = null;
        this.availableLabelsService.refreshLabels();
        this.availableLanguagesService.refreshLanguages();
        this.activeFilterService.updateFilter('main', 'all');
      }
    });
    this.activeScopeService.refreshScope();

    /**
     * Subscribe for user status changes
     */
    this.authResource.loginStatusUpdates.subscribe((value) => {
      let scope: Scope;

      this.isLoggedIn = value;

      // Update scope for loading data
      if (value) {
        scope = {
          area: 'user',
          value: this.authResource.currentUser,
        };
      } else {
        scope = {
          area: null,
          value: null,
        };
      }

      this.activeScopeService.updateScope(scope);
    });
  }

  ngOnDestroy() {
    this.activeScopeSubscription.unsubscribe();
  }

}
