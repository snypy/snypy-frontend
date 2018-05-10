import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;

  constructor() {
  }

  userLogin() {
    this.isLoggedIn = true;
  }

  userLogout() {
    this.isLoggedIn = false;
  }
}
