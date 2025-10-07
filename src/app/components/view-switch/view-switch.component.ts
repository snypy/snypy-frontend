import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthResource } from '../../services/resources/auth.resource';
import { UpdateScope } from '../../state/scope/scope.actions';

@Component({
  selector: 'app-view-switch',
  templateUrl: './view-switch.component.html',
  styleUrls: ['./view-switch.component.scss'],
  standalone: false,
})
export class ViewSwitchComponent {
  constructor(
    private router: Router,
    private store: Store,
    private authResource: AuthResource
  ) {}

  // Custom navigation handlers to prevent full page reload
  navigateToUser(): void {
    this.store.dispatch(new UpdateScope({ area: 'user', value: this.authResource.currentUser }));
    this.router.navigateByUrl('/user', { skipLocationChange: true });
  }

  navigateToGlobal(): void {
    this.store.dispatch(new UpdateScope({ area: 'global', value: null }));
    this.router.navigateByUrl('/global', { skipLocationChange: true });
  }
}
