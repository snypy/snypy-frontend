import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { User, UserResource } from "./user.resource";
import { ResourceAction } from "ngx-resource-factory/resource/resource-action";
import { ResourceActionHttpMethod } from "ngx-resource-factory/resource/resource-action-http-method";
import { ResourceActionMethod } from "ngx-resource-factory/resource/resource-action-method";
import { Subject } from "rxjs";
import { ResourceRegistry } from "ngx-resource-factory/resource/resource-registry";
import { HttpClient } from "@angular/common/http";
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";


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
  currentUser: ResourceModel<User> = null;
  loginStatusUpdates: Subject<boolean> = new Subject<boolean>();

  constructor(registry: ResourceRegistry,
              http: HttpClient,
              private userResource: UserResource) {
    super(registry, http);
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
  _logout: ResourceActionMethod<any, any, any>;

  @ResourceAction({
    method: ResourceActionHttpMethod.POST,
    isList: false,
    invalidateCache: true,
    url: environment.apiUrl + 'auth/register/',
  })
  register: ResourceActionMethod<any, any, any>

  /**
   * This method is used in the main app component to load an active user during the bootstrap process
   */
  public init() {
    if (AuthResource.getToken()) {
      this.loadCurrentUser();
    }
  }

  public login(credentials: AuthCredentials) {
    let promise = this._login({}, credentials).$promise;

    promise
      .then((data) => {
        AuthResource.setToken(data.token);
        this.loadCurrentUser();
      })
      .catch((reason) => {
        console.log('Cannot authenticate!');
        console.log(reason);
      });

    return promise;
  }

  public logout() {
    if (this.isLoggedId) {
      this._logout().$promise
        .then((data) => {
        })
        .catch((reason) => {
          console.log("Cannot remove token");
          console.log(reason);
        });

      AuthResource.removeToken();
      this.unloadCurrentUser();
      this.updateLoginStatus(false);
    }
  }

  public static getToken() {
    return localStorage.getItem(AUTH_TOKEN);
  }

  private static setToken(token: string) {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  private static removeToken() {
    localStorage.removeItem(AUTH_TOKEN);
  }

  private updateLoginStatus(value: boolean) {
    this.isLoggedId = value;
    this.loginStatusUpdates.next(value);
  }

  private loadCurrentUser() {
    console.log('Load current user');
    this.userResource.current().$promise
      .then((data) => {
        this.currentUser = data;
        this.updateLoginStatus(true);
      })
      .catch((reason) => {
        console.log("Cannot load current user");
        console.log(reason);
        AuthResource.removeToken();
        this.updateLoginStatus(false);
      })
  }

  private unloadCurrentUser() {
    this.currentUser = null;
  }
}
