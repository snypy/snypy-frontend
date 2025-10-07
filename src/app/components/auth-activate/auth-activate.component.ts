import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@snypy/rest-client';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth-activate',
  templateUrl: './auth-activate.component.html',
  styleUrls: ['./auth-activate.component.scss'],
  standalone: false,
})
export class AuthActivateComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.authTokenLogoutCreate();

    this.activatedRoute.queryParams.subscribe(params => {
      firstValueFrom(
        this.authService.authVerifyRegistrationCreate({
          verifyRegistrationRequest: {
            user_id: params['user_id'],
            timestamp: params['timestamp'],
            signature: params['signature'],
          },
        })
      )
        .then(() => {
          this.toastr.success('User activated. Please login.');
          this.router.navigateByUrl('');
        })
        .catch(() => {
          this.toastr.error('User activation failed!');
          this.router.navigateByUrl('');
        });
    });
  }
}
