import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceAction } from 'ngx-resource-factory/resource/resource-action';
import { ResourceActionHttpMethod } from 'ngx-resource-factory/resource/resource-action-http-method';
import { ResourceActionMethod } from 'ngx-resource-factory/resource/resource-action-method';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { ResourceRegistry } from 'ngx-resource-factory/resource/resource-registry';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, UserResource } from './user.resource';

const AUTH_TOKEN = 'auth.token';

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
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

  constructor(registry: ResourceRegistry, http: HttpClient, private userResource: UserResource) {
    super(registry, http);
  }

  @ResourceAction({
    method: ResourceActionHttpMethod.POST,
    isList: false,
    invalidateCache: true,
    urlSuffix: 'login/',
  })
  _login: ResourceActionMethod<Record<string, unknown>, AuthCredentials, { token: string }>;

  @ResourceAction({
    method: ResourceActionHttpMethod.POST,
    isList: false,
    invalidateCache: true,
    urlSuffix: 'logout/',
  })
  _logout: ResourceActionMethod<Record<string, unknown>, any, any>;

  @ResourceAction({
    method: ResourceActionHttpMethod.POST,
    isList: false,
    invalidateCache: true,
    url: environment.apiUrl + 'auth/register/',
  })
  register: ResourceActionMethod<Record<string, unknown>, RegisterPayload, any>;

  @ResourceAction({
    method: ResourceActionHttpMethod.POST,
    isList: false,
    invalidateCache: true,
    url: environment.apiUrl + 'auth/verify-registration/',
  })
  verify: ResourceActionMethod<Record<string, unknown>, Record<string, string>, any>;

  /**
   * This method is used in the main app component to load an active user during the bootstrap process
   */
  public init(): void {
    if (AuthResource.getToken()) {
      this.loadCurrentUser();
    }
  }

  public login(credentials: AuthCredentials): Promise<{ token: string }> {
    const promise = this._login({}, credentials).$promise;

    promise
      .then(data => {
        AuthResource.setToken(data.token);
        this.loadCurrentUser();
      })
      .catch(reason => {
        console.log('Cannot authenticate!');
        console.log(reason);
      });

    return promise;
  }

  public logout(): void {
    if (this.isLoggedId) {
      this._logout()
        .$promise.then()
        .catch(reason => {
          console.log('Cannot remove token');
          console.log(reason);
        });

      AuthResource.removeToken();
      this.unloadCurrentUser();
      this.updateLoginStatus(false);
    }
  }

  public static getToken(): string {
    return localStorage.getItem(AUTH_TOKEN);
  }

  private static setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  private static removeToken(): void {
    localStorage.removeItem(AUTH_TOKEN);
  }

  private updateLoginStatus(value: boolean): void {
    this.isLoggedId = value;
    this.loginStatusUpdates.next(value);
  }

  private loadCurrentUser() {
    console.log('Load current user');
    this.userResource
      .current()
      .$promise.then(data => {
        this.currentUser = data;
        this.updateLoginStatus(true);
      })
      .catch(reason => {
        console.log('Cannot load current user');
        console.log(reason);
        AuthResource.removeToken();
        this.updateLoginStatus(false);
      });
  }

  private unloadCurrentUser() {
    this.currentUser = null;
  }
}
