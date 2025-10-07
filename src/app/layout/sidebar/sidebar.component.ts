import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ScopeModel } from '../../state/scope/scope.model';
import { ScopeState } from '../../state/scope/scope.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent implements OnInit, OnDestroy {
  scope: ScopeModel;

  scopeUpdatedSubscription: Subscription;

  @Select(ScopeState) scope$: Observable<ScopeModel>;

  ngOnInit(): void {
    this.scopeUpdatedSubscription = this.scope$.subscribe((scope: ScopeModel) => {
      this.scope = scope;
    });
  }

  ngOnDestroy(): void {
    this.scopeUpdatedSubscription.unsubscribe();
  }
}
