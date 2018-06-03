import { Component, OnInit } from '@angular/core';
import { AuthResource } from "../../services/resources/auth.resource";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authResource: AuthResource) {
  }

  ngOnInit() {
  }

  doLogout() {
    this.authResource.logout();
  }
}
