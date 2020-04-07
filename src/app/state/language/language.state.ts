import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Language, LanguageResource } from "../../services/resources/language.resource";
import { UpdateLanguages } from "./language.actions";
import { SelectSnapshot } from "@ngxs-labs/select-snapshot";
import { ScopeModel } from "../scope/scope.model";
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { User } from "../../services/resources/user.resource";
import { Team } from "../../services/resources/team.resource";
import { ScopeState } from "../scope/scope.state";


@State<Language[]>({
  name: 'languages',
  defaults: []
})
@Injectable()
export class LanguageState {

  constructor(private languageResource: LanguageResource) {
  }

  @SelectSnapshot(ScopeState)
  private scope: ScopeModel;

  @Action(UpdateLanguages)
  async updateLanguages(ctx: StateContext<Language[]>) {
    let payload = {};
    let scope = this.scope;

    /**
     * Scope specific filters
     */
    switch (scope.area) {
      case 'user':
        let user = scope.value as ResourceModel<User>;
        payload['user'] = user.pk;
        break;
      case 'team':
        let team = scope.value as ResourceModel<Team>;
        payload['team'] = team.pk;
        break;
    }

    ctx.setState(await this.languageResource.query({...payload,}).$promise);
  }
}
