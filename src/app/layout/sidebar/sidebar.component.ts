import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { Select } from "@ngxs/store";
import { ScopeState } from "../../state/scope/scope.state";
import { ScopeModel } from "../../state/scope/scope.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  scope: ScopeModel;

  scopeUpdatedSubscription: Subscription;

  @Select(ScopeState) scope$: Observable<ScopeModel>;

  constructor() { }

  ngOnInit() {
    this.scopeUpdatedSubscription = this.scope$.subscribe((scope: ScopeModel) => {
      this.scope = scope;
    });
  }

  ngOnDestroy() {
    this.scopeUpdatedSubscription.unsubscribe();
  }

}
