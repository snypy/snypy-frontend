import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PasswordResetService } from '@snypy/rest-client';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, combineLatest, EMPTY, Subject } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { Errors } from '../../helpers/errors';
import { Validators } from '../../helpers/validators';

@UntilDestroy()
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SetPasswordComponent implements OnInit {
  STATE_INVALID_TOKEN = 'INVALID_TOKEN';
  STATE_SET_PASSWORD = 'SET_PASSWORD';
  STATE_SET_PASSWORD_COMPLETE = 'SET_PASSWORD_COMPLETE';

  public readonly activeState$ = new BehaviorSubject<string | null>(null);

  private readonly token$ = this.activatedRoute.queryParamMap.pipe(map(params => params.get('token')));

  private readonly confirmPasswordSubject = new Subject<string>();
  private readonly passwordConfirmed$ = combineLatest([this.token$.pipe(filter(Boolean)), this.confirmPasswordSubject.asObservable()]).pipe(
    switchMap(([token, password]) =>
      this.passwordResetService.passwordResetConfirmCreate({ passwordTokenRequest: { token, password } }).pipe(
        catchError(reason => {
          Errors.handleFormError(this.form, reason);
          if (reason.error['non_field_errors']) {
            for (const error of reason.error['non_field_errors']) {
              this.toastr.error(error);
            }
          }
          return EMPTY;
        })
      )
    )
  );

  public form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private readonly passwordResetService: PasswordResetService
  ) {}

  public ngOnInit(): void {
    this.token$
      .pipe(
        untilDestroyed(this),
        switchMap(token => this.passwordResetService.passwordResetValidateTokenCreate({ resetTokenRequest: { token } })),
        catchError(() => {
          this.activeState$.next(this.STATE_INVALID_TOKEN);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.createForm();
        this.activeState$.next(this.STATE_SET_PASSWORD);
      });

    this.passwordConfirmed$.pipe(untilDestroyed(this)).subscribe(() => {
      this.activeState$.next(this.STATE_SET_PASSWORD_COMPLETE);
    });
  }

  public createForm() {
    this.form = new FormGroup(
      {
        password: new FormControl(null, Validators.required, null),
        password_confirm: new FormControl(null, Validators.required, null),
      },
      { validators: Validators.matchPassword('password', 'password_confirm') }
    );
  }

  public doSetPassword(): void {
    if (this.form.valid) {
      this.confirmPasswordSubject.next(this.form.get('password').value);
    }
  }
}
