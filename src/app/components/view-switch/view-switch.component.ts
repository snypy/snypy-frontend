import { Component, OnInit } from '@angular/core';
import { AuthResource } from "../../services/resources/auth.resource";
import { Store } from "@ngxs/store";
import { UpdateScope } from "../../state/scope/scope.actions";

@Component({
  selector: 'app-view-switch',
  templateUrl: './view-switch.component.html',
  styleUrls: ['./view-switch.component.scss']
})
export class ViewSwitchComponent implements OnInit {

  constructor(private store: Store,
              private authResource: AuthResource) {
  }

  ngOnInit() {
  }

  loadUser() {
    console.log("Loading user!");
    this.store.dispatch(new UpdateScope({
      area: 'user',
      value: this.authResource.currentUser,
    }));
  }

  loadGlobal() {
    console.log("Loading global!");
    this.store.dispatch(new UpdateScope({
      area: 'global',
      value: null,
    }));
  }
}
