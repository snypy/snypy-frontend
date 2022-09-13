import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@snypy/rest-client';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth-activate',
  templateUrl: './auth-activate.component.html',
  styleUrls: ['./auth-activate.component.scss'],
})
export class AuthActivateComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {}

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
          console.log('User activated');
          this.router.navigateByUrl('');
        })
        .catch(() => {
          console.log('User activation failed');
          this.router.navigateByUrl('');
        });
    });
  }
}
