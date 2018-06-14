import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthResource } from "./services/resources/auth.resource";
import { ActiveScopeService, Scope } from "./services/navigation/activeScope.service";
import { SnippetLoaderService } from "./services/navigation/snippetLoader.service";
import { AvailableLabelsService } from "./services/navigation/availableLabels.service";
import { ActiveFilterService } from "./services/navigation/activeFilter.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;

  activeScopeSubscription: Subscription;

  constructor(private authResource: AuthResource,
              private activeScopeService: ActiveScopeService,
              private availableLabelsService: AvailableLabelsService,
              private activeFilterService: ActiveFilterService,
              private snippetLoaderService: SnippetLoaderService) {
  }

  ngOnInit() {
    /**
     * Initialize auth for already authenticated users
     */
    this.authResource.init();

    /**
     * Subscribe for user status changes
     */
    this.authResource.loginStatusUpdates.subscribe((value) => {
      this.isLoggedIn = value;

      // Update scope for loading data
      this.activeScopeService.updateScope({
        area: 'user',
        value: this.authResource.currentUser,
      });
    });

    /**
     * Refresh snippets on scope changes
     */
    this.activeScopeSubscription = this.activeScopeService.scopeUpdated.subscribe((scope: Scope) => {
      this.snippetLoaderService.activeSnippet = null;
      this.availableLabelsService.refreshLabels();
      this.activeFilterService.updateFilter('main', 'all');
    });
  }

  userLogin(credentials: { username: string, password: string }) {
    this.authResource.login(credentials)
      .then((data) => {
        // Login success
      })
      .catch((reason) => {
        // Login failed
      })
  }

  ngOnDestroy() {
    this.activeScopeSubscription.unsubscribe();
  }
}
