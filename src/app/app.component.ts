import { Component, OnInit } from '@angular/core';
import { AuthResource } from "./services/resources/auth.resource";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private authResource: AuthResource) {
  }

  ngOnInit() {
    /**
     * Initialize auth for already authenticated users
     */
    this.authResource.init();
  }
}
