import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Subject } from 'rxjs';
import { UserService, User, AuthService } from '@snypy/rest-client';
import { AuthTokenLoginCreateRequestParams } from '@snypy/rest-client';

const AUTH_TOKEN = 'auth.token';

export interface RegisterPayload {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
}

@Injectable()
export class AuthResource {
  isLoggedId = false;
  currentUser: User = null;
  loginStatusUpdates: Subject<boolean> = new Subject<boolean>();

  constructor(
    http: HttpClient,
    private userService: UserService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  // Flag to track if initial user load has been done
  private initialUserLoaded = false;

  /**
   * This method is used in the main app component to load an active user during the bootstrap process
   */
  public init(): void {
    if (AuthResource.getToken() && !this.initialUserLoaded) {
      this.loadCurrentUser();
      this.initialUserLoaded = true;
    } else if (AuthResource.getToken() && this.isLoggedId) {
      // Already logged in, just use existing user data
      this.updateLoginStatus(true);
    }
  }

  public login(credentials: AuthTokenLoginCreateRequestParams): Promise<{ token: string }> {
    const promise = firstValueFrom(this.authService.authTokenLoginCreate(credentials));

    promise
      .then(data => {
        AuthResource.setToken(data.token);
        this.loadCurrentUser();
      })
      .catch(reason => {
        console.log('Cannot authenticate!');
        console.log(reason);

        if (reason.error['non_field_errors']) {
          for (const error of reason.error['non_field_errors']) {
            this.toastr.error(error);
          }
        }
      });

    return promise;
  }

  public logout(): void {
    if (this.isLoggedId) {
      firstValueFrom(this.authService.authTokenLogoutCreate())
        .then()
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
    firstValueFrom(this.userService.userCurrentRetrieve())
      .then(data => {
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
