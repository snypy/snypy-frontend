import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResource } from '../../services/resources/auth.resource';

@Component({
  selector: 'app-auth-activate',
  templateUrl: './auth-activate.component.html',
  styleUrls: ['./auth-activate.component.scss'],
})
export class AuthActivateComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private authResource: AuthResource, private router: Router) {}

  ngOnInit(): void {
    this.authResource.logout();

    this.activatedRoute.queryParams.subscribe(params => {
      this.authResource
        .verify({}, params)
        .$promise.then(() => {
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
