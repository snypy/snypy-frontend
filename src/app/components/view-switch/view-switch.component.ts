import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActiveFilterService } from '../../services/navigation/activeFilter.service';
import { AuthResource } from '../../services/resources/auth.resource';
import { UpdateScope } from '../../state/scope/scope.actions';

@Component({
  selector: 'app-view-switch',
  templateUrl: './view-switch.component.html',
  styleUrls: ['./view-switch.component.scss'],
})
export class ViewSwitchComponent {
  constructor(private store: Store, private authResource: AuthResource, private activeFilterService: ActiveFilterService) {}

  loadUser(): void {
    console.log('Loading user!');
    this.activeFilterService.updateFilter('main', 'all', false);
    this.store.dispatch(
      new UpdateScope({
        area: 'user',
        value: this.authResource.currentUser,
      })
    );
  }

  loadGlobal(): void {
    console.log('Loading global!');
    this.store.dispatch(
      new UpdateScope({
        area: 'global',
        value: null,
      })
    );
  }
}
