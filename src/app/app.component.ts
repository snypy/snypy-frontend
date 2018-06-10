import { Component, OnInit } from '@angular/core';
import { AuthResource } from "./services/resources/auth.resource";
import { ActiveScopeService, Scope } from "./services/navigation/activeScope.service";
import { SnippetLoaderService } from "./services/navigation/snippetLoader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authResource: AuthResource,
              private activeScopeService: ActiveScopeService,
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
    this.activeScopeService.scopeUpdated.subscribe((scope: Scope) => {
      this.snippetLoaderService.refreshSnippets();
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
}
