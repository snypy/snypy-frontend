import { Component, OnInit } from '@angular/core';
import { ActiveScopeService, Scope } from "../../services/navigation/activeScope.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  scope: Scope;

  constructor(private activeScopeService: ActiveScopeService) { }

  ngOnInit() {
    this.activeScopeService.scopeUpdated.subscribe((scope: Scope) => {
      this.scope = scope;
    });
  }

}
