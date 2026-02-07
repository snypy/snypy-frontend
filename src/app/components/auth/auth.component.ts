import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  standalone: false,
})
export class AuthComponent implements OnInit {
  public STATE_LOGIN = 'LOGIN';
  public STATE_REGISTER = 'REGISTER';
  public STATE_REGISTER_COMPLETE = 'REGISTER_COMPLETE';
  public STATE_PASSWORD_FORGOT = 'PASSWORD_FORGOT';
  public STATE_PASSWORD_FORGOT_COMPLETE = 'PASSWORD_FORGOT_COMPLETE';

  private activeStateSubject = new BehaviorSubject<string>(this.STATE_LOGIN);
  public activeState$: Observable<string> = this.activeStateSubject.asObservable();

  private readonly createPasswordResetSubject = new Subject<{ email: string; formGroup: FormGroup }>();
  private readonly passwordResetCreated$ = this.createPasswordResetSubject.asObservable().pipe(
    switchMap(subject =>
      this.passwordResetService.passwordResetCreate({ emailRequest: { email: subject.email } }).pipe(
        catchError(reason => {
          Errors.handleFormError(subject.formGroup, reason);
          if (reason['non_field_errors']) {
            for (const error of reason['non_field_errors']) {
              this.toastr.error(error);
            }
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
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.passwordResetCreated$.pipe(untilDestroyed(this)).subscribe(() => {
      this.setActiveState(this.STATE_PASSWORD_FORGOT_COMPLETE);
    });
  }

  public doLogin(authCredentials: AuthTokenLoginCreateRequestParams): void {
    this.authResource
      .login(authCredentials)
      .then(() => {
        this.cdr.markForCheck();
      })
      .catch(() => {
        this.cdr.markForCheck();
      });
  }

  public doRegister(registerPayload: RegisterPayload): void {
    firstValueFrom(this.authService.authRegisterCreate({ defaultRegisterUserRequest: registerPayload }))
      .then(() => {
        console.log('User registered');
        this.setActiveState(this.STATE_REGISTER_COMPLETE);
        this.cdr.markForCheck();
      })
      .catch(reason => {
        console.log('Cannot register user');
        console.log(reason);
        this.server_errors = reason.error;
        this.cdr.markForCheck();
      });
  }

  public doPasswordReset(passwordResetSubject: { email: string; formGroup: FormGroup }): void {
    this.createPasswordResetSubject.next(passwordResetSubject);
  }

  public setActiveState(newState: string): void {
    this.activeStateSubject.next(newState);
  }
}
