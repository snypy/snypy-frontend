import { Component, OnInit } from '@angular/core';
import { ActiveScopeService } from "../../services/navigation/activeScope.service";
import { AuthResource } from "../../services/resources/auth.resource";

@Component({
  selector: 'app-view-switch',
  templateUrl: './view-switch.component.html',
  styleUrls: ['./view-switch.component.scss']
})
export class ViewSwitchComponent implements OnInit {

  constructor(private activeScopeService: ActiveScopeService,
              private authResource: AuthResource) {
  }

  ngOnInit() {
  }

  loadUser() {
    console.log("Loading user!");
    this.activeScopeService.updateScope({
      area: 'user',
      value: this.authResource.currentUser,
    })
  }

  loadGlobal() {
    console.log("Loading global!");
    this.activeScopeService.updateScope({
      area: 'global',
      value: null,
    })
  }
}
