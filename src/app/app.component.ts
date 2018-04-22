import { Component, OnInit } from '@angular/core';


import { UserResource, User } from './services/resources/user.resource';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  currentUser = 1;

  constructor() {
  }

  ngOnInit() {
  }

}
