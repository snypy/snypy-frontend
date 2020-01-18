import { Component, OnInit } from '@angular/core';
import { AuthResource } from "./services/resources/auth.resource";
import { ActiveScopeService, Scope } from "./services/navigation/activeScope.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authResource: AuthResource,
              private activeScopeService: ActiveScopeService,) {
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
}
