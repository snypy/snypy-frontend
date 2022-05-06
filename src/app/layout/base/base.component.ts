import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ActiveFilterService } from '../../services/navigation/activeFilter.service';
import { AuthResource } from '../../services/resources/auth.resource';
import { UpdateLabels } from '../../state/label/label.actions';
import { UpdateLanguages } from '../../state/language/language.actions';
import { RefreshScope, UpdateScope } from '../../state/scope/scope.actions';
import { ScopeModel } from '../../state/scope/scope.model';
import { ScopeState } from '../../state/scope/scope.state';
import { UpdateSnippets } from '../../state/snippet/snippet.actions';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit, OnDestroy {
  isLoggedIn = false;

  scopeSubscription: Subscription;

  @Select(ScopeState) scope$: Observable<ScopeModel>;

  constructor(private store: Store, private authResource: AuthResource, private activeFilterService: ActiveFilterService) {}

  ngOnInit(): void {
    /**
     * Initialize auth for already authenticated users
     */
    this.authResource.init();

    /**
     * Refresh snippets on scope changes
     */
    this.scope$.toPromise().then(() => {
      this.activeFilterService.updateFilter('main', 'all');
    });
    this.scopeSubscription = this.scope$.subscribe((scope: ScopeModel) => {
      if (scope && scope.area) {
        this.store.dispatch(new UpdateSnippets());
        this.store.dispatch(new UpdateLabels());
        this.store.dispatch(new UpdateLanguages());
      }
    });
    this.store.dispatch(new RefreshScope());

    /**
     * Subscribe for user status changes
     */
    this.authResource.loginStatusUpdates.subscribe(value => {
      let scope: ScopeModel;

      this.isLoggedIn = value;

      // Update scope for loading data
      if (value) {
        scope = {
          area: 'user',
          value: this.authResource.currentUser,
        };
      } else {
        scope = {
          area: null,
          value: null,
        };
      }

      this.store.dispatch(new UpdateScope(scope));
    });
  }

  ngOnDestroy(): void {
    this.scopeSubscription.unsubscribe();
  }
}
