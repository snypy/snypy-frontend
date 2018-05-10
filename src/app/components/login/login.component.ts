import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() login = new EventEmitter<{username: string; password: string}>();

  constructor() { }

  ngOnInit() {
  }

  doLogin() {
    this.login.emit({
      username: 'user',
      password: 'pass',
    });
  }
}
