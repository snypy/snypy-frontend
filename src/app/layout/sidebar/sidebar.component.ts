import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveScopeService, Scope } from "../../services/navigation/activeScope.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  scope: Scope;

  scopeUpdatedSubscription: Subscription;

  constructor(private activeScopeService: ActiveScopeService) { }

  ngOnInit() {
    this.scopeUpdatedSubscription = this.activeScopeService.scopeUpdated.subscribe((scope: Scope) => {
      this.scope = scope;
    });
  }

  ngOnDestroy() {
    this.scopeUpdatedSubscription.unsubscribe();
  }

}
