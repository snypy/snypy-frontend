import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { TeamRetrieveRequestParams, TeamService } from '@snypy/rest-client';
import { firstValueFrom, Observable, skip, Subscription } from 'rxjs';
import { ActiveFilterService } from '../../services/navigation/activeFilter.service';
import { AuthResource } from '../../services/resources/auth.resource';
import { UpdateLabels } from '../../state/label/label.actions';
import { UpdateLanguages } from '../../state/language/language.actions';
import { UpdateScope } from '../../state/scope/scope.actions';
import { ScopeModel } from '../../state/scope/scope.model';
import { ScopeState } from '../../state/scope/scope.state';
import { UpdateSnippets } from '../../state/snippet/snippet.actions';
import { UpdateTeams } from '../../state/team/team.actions';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  standalone: false,
})
export class BaseComponent implements OnInit, OnDestroy {
  isLoggedIn = false;

  scopeSubscription: Subscription;
  authSubscription: Subscription;
  routeSubscription: Subscription;

  @Select(ScopeState) scope$: Observable<ScopeModel>;

  constructor(
    protected store: Store,
    protected authResource: AuthResource,
    protected activeFilterService: ActiveFilterService,
    protected route: ActivatedRoute,
    protected teamService: TeamService,
    protected cdr: ChangeDetectorRef
  ) {
    // Set initial logged in state from auth resource
    this.isLoggedIn = this.authResource.isLoggedId;
  }

  ngOnInit(): void {
    // Initialize auth only if we're not already logged in
    if (!this.isLoggedIn) {
      this.authResource.init();
    }

    /**
     * Refresh snippets on scope changes
     */
    this.scopeSubscription = this.scope$.pipe(skip(1)).subscribe((scope: ScopeModel) => {
      if (scope && scope.area) {
        this.store.dispatch(new UpdateSnippets());
        this.store.dispatch(new UpdateLabels());
        this.store.dispatch(new UpdateTeams());
        this.store.dispatch(new UpdateLanguages());
      }
    });

    /**
     * Subscribe for user status changes
     */
    this.authSubscription = this.authResource.loginStatusUpdates.subscribe(value => {
      this.isLoggedIn = value;
      if (value) {
        this.setScopeData();
      }
      this.cdr.markForCheck();
    });

    /**
     * Only set scope on route param changes if no scope is currently set
     * Let the components manage scope changes directly otherwise
     */
    this.routeSubscription = this.route.params.pipe(skip(1)).subscribe(() => {
      if (this.isLoggedIn) {
        this.setScopeData();
      }
    });
  }

  ngOnDestroy(): void {
    this.scopeSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  setScopeData(): void {
    console.log(this.route.snapshot.data.scope);

    if (this.isLoggedIn) {
      switch (this.route.snapshot.data.scope) {
        case 'team': {
          this.setScopeTeam(this.route.snapshot.params as TeamRetrieveRequestParams);
          break;
        }
        case 'user': {
          this.store.dispatch(new UpdateScope({ area: 'user', value: this.authResource.currentUser }));
          break;
        }
        case 'global': {
          this.store.dispatch(new UpdateScope({ area: 'global', value: null }));
        }
        default: {
          this.store.dispatch(new UpdateScope({ area: null, value: null }));
          break;
        }
      }
    }
  }

  setScopeTeam(value: TeamRetrieveRequestParams) {
    firstValueFrom(this.teamService.teamRetrieve(value))
      .then(team => {
        this.store.dispatch(
          new UpdateScope({
            area: 'team',
            value: team,
          })
        );
      })
      .catch(() => {
        console.log('Failed to load Team');
      });
  }
}
