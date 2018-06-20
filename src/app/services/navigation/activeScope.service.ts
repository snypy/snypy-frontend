import { Injectable } from '@angular/core';
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";

import { Team } from "../resources/team.resource";
import { User } from "../resources/user.resource";
import { Subject } from "rxjs/Subject";


export interface Scope {
  area: 'user' | 'team' | 'global' | 'none';
  value: ResourceModel<User | Team>;
}

@Injectable()
export class ActiveScopeService {

  private activeScope: Scope;

  scopeUpdated = new Subject<Scope>();

  constructor() {
  }

  getScope() {
    return this.activeScope;
  }

  updateScope(scope: Scope) {
    console.log("Scope updated");
    console.log(scope);

    this.activeScope = scope;
    this.scopeUpdated.next(scope);
  }

  refreshScope() {
    this.scopeUpdated.next(this.activeScope);
  }
}
