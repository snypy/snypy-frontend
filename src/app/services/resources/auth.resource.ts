import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { User } from "./user.resource";
import { ResourceAction } from "ngx-resource-factory/resource/resource-action";
import { ResourceActionHttpMethod } from "ngx-resource-factory/resource/resource-action-http-method";
import { ResourceActionMethod } from "ngx-resource-factory/resource/resource-action-method";
import { Subject } from "rxjs/Subject";
import { ResourceRegistry } from "ngx-resource-factory/resource/resource-registry";
import { HttpClient } from "@angular/common/http";


const AUTH_TOKEN = 'auth.token';

export type AuthCredentials = {
  username: string;
  password: string;
}


@Injectable()
@ResourceConfiguration({
  name: 'AuthResource',
  url: environment.apiUrl + 'auth/token/:pk/',
  pkAttr: 'pk',
  instanceClass: User,
  stripTrailingSlashes: false,
})
export class AuthResource extends Resource<User> {

  isLoggedId = false;
  loginStatusUpdates: Subject<boolean> = new Subject<boolean>();

  constructor(registry: ResourceRegistry, http: HttpClient) {
    super(registry, http);

    if (this.getToken()) {
      this.updateLoginStatus(true);
    }
  }

  updateLoginStatus(value: boolean) {
    this.isLoggedId = value;
    this.loginStatusUpdates.next(value);
  }

  @ResourceAction({
    method: ResourceActionHttpMethod.POST,
    isList: false,
    invalidateCache: true,
    urlSuffix: 'login/',
  })
  _login: ResourceActionMethod<any, any, {token: string}>;

  @ResourceAction({
    method: ResourceActionHttpMethod.POST,
    isList: false,
    invalidateCache: true,
    urlSuffix: 'logout/',
  })
  _logout: ResourceActionMethod<any, any, null>;

  login(credentials: AuthCredentials) {
    let promise = this._login({}, credentials).$promise;

    promise
      .then((data) => {
        this.setToken(data.token);
        this.updateLoginStatus(true);
      })
      .catch((reason) => {
        console.log('Cannot authenticate!');
        console.log(reason);
      });

    return promise;
  }

  logout() {
    if (this.isLoggedId) {
      let token = this.getToken();

      this._logout().$promise
        .then((data) => {
        })
        .catch((reason) => {
          console.log("Cannot remove token");
          console.log(reason);
        });

      this.removeToken();
      this.updateLoginStatus(false);
    }
  }

  getToken() {
    return localStorage.getItem(AUTH_TOKEN);
  }

  private setToken(token: string) {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  private removeToken() {
    localStorage.removeItem(AUTH_TOKEN);
  }
}
