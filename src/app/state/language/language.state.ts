import { Injectable } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Action, State, StateContext } from '@ngxs/store';
import { Team } from '@snypy/rest-client';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Language, LanguageResource } from '../../services/resources/language.resource';
import { User } from '../../services/resources/user.resource';
import { ScopeModel } from '../scope/scope.model';
import { ScopeState } from '../scope/scope.state';
import { UpdateLanguages } from './language.actions';

@State<Language[]>({
  name: 'languages',
  defaults: [],
})
@Injectable()
export class LanguageState {
  constructor(private languageResource: LanguageResource) {}

  @SelectSnapshot(ScopeState)
  private scope: ScopeModel;

  @Action(UpdateLanguages)
  async updateLanguages(ctx: StateContext<Language[]>): Promise<void> {
    const payload = {};
    const scope = this.scope;

    /**
     * Scope specific filters
     */
    switch (scope.area) {
      case 'user':
        const user = scope.value as ResourceModel<User>;
        payload['user'] = user.pk;
        break;
      case 'team':
        const team = scope.value as Team;
        payload['team'] = team.pk;
        break;
    }

    ctx.setState(await this.languageResource.query({ ...payload }).$promise);
  }
}
