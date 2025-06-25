import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PasswordResetService, AuthService } from '@snypy/rest-client';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, EMPTY, Observable, Subject, firstValueFrom } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Errors } from '../../helpers/errors';
import { AuthResource, RegisterPayload } from '../../services/resources/auth.resource';
import { AuthTokenLoginCreateRequestParams } from '@snypy/rest-client';

@UntilDestroy()
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public STATE_LOGIN = 'LOGIN';
  public STATE_REGISTER = 'REGISTER';
  public STATE_REGISTER_COMPLETE = 'REGISTER_COMPLETE';
  public STATE_PASSWORD_FORGOT = 'PASSWORD_FORGOT';
  public STATE_PASSWORD_FORGOT_COMPLETE = 'PASSWORD_FORGOT_COMPLETE';

  private activeStateSubject = new BehaviorSubject<string>(this.STATE_LOGIN);
  public activeState$: Observable<string> = this.activeStateSubject.asObservable();
  public passwordResetErrors: any = null;

  private readonly createPasswordResetSubject = new Subject<{ email: string; formGroup: FormGroup }>();
  private readonly passwordResetCreated$ = this.createPasswordResetSubject.asObservable().pipe(
    switchMap(subject =>
      this.passwordResetService.passwordResetCreate({ emailRequest: { email: subject.email } }).pipe(
        catchError(reason => {
          Errors.handleFormError(subject.formGroup, reason);
          if (reason.error && reason.error.non_field_errors) {
            this.passwordResetErrors = reason.error;
          } else {
            // Fallback for unexpected error structures or if non_field_errors is not the primary source
             this.passwordResetErrors = { non_field_errors: ['An unexpected error occurred. Please try again.'] };
          }
          // Optionally, still log to toastr for broader visibility if desired, or remove if form display is sufficient
          if (reason.error && reason.error.non_field_errors) {
            reason.error.non_field_errors.forEach(error => this.toastr.error(error));
          } else if (reason.message) {
            this.toastr.error(reason.message);
          } else {
            this.toastr.error('An unexpected error occurred during password reset.');
          }
          return EMPTY;
        })
      )
    )
  );

  @Output() public login = new EventEmitter<AuthTokenLoginCreateRequestParams>();

  public server_errors = null;

  public constructor(
    private readonly authResource: AuthResource,
    private readonly passwordResetService: PasswordResetService,
    private readonly toastr: ToastrService,
    private readonly authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.passwordResetCreated$.pipe(untilDestroyed(this)).subscribe(() => {
      this.setActiveState(this.STATE_PASSWORD_FORGOT_COMPLETE);
    });
  }

  public doLogin(authCredentials: AuthTokenLoginCreateRequestParams): void {
    this.authResource.login(authCredentials);
  }

  public doRegister(registerPayload: RegisterPayload): void {
    firstValueFrom(this.authService.authRegisterCreate({ defaultRegisterUserRequest: registerPayload }))
      .then(() => {
        console.log('User registered');
        this.setActiveState(this.STATE_REGISTER_COMPLETE);
      })
      .catch(reason => {
        console.log('Cannot register user');
        console.log(reason);
        this.server_errors = reason.error;
      });
  }

  public doPasswordReset(passwordResetSubject: { email: string; formGroup: FormGroup }): void {
    this.passwordResetErrors = null;
    this.createPasswordResetSubject.next(passwordResetSubject);
  }

  public setActiveState(newState: string): void {
    this.passwordResetErrors = null;
    this.server_errors = null; // Also clear registration errors when changing state
    this.activeStateSubject.next(newState);
  }
}
