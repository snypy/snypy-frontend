import { Component, OnInit } from '@angular/core';
import { AuthResource } from "./services/resources/auth.resource";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authResource: AuthResource) {
  }

  ngOnInit() {
    this.authResource.init();

    this.isLoggedIn = this.authResource.isLoggedId;

    this.authResource.loginStatusUpdates.subscribe((value) => {
      this.isLoggedIn = value;
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
