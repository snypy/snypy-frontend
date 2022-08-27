import { Injectable } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Action, State, StateContext } from '@ngxs/store';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { User } from '../../services/resources/user.resource';
import { ScopeModel } from '../scope/scope.model';
import { ScopeState } from '../scope/scope.state';
import { AddLabel, RemoveLabel, UpdateLabel, UpdateLabels } from './label.actions';
import { Team, Label, LabelService } from '@snypy/rest-client';
import { firstValueFrom } from 'rxjs';

@State<Label[]>({
  name: 'labels',
  defaults: [],
})
@Injectable()
export class LabelState {
  constructor(private labelService: LabelService) {}

  @SelectSnapshot(ScopeState)
  private scope: ScopeModel;

  @Action(UpdateLabels)
  async updateLabels(ctx: StateContext<Label[]>): Promise<void> {
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
      case 'global':
        ctx.setState([]);
        return;
    }

    ctx.setState(await firstValueFrom(this.labelService.labelList({ ...payload })));
  }

  @Action(AddLabel)
  addLabel(ctx: StateContext<Label[]>, action: AddLabel): void {
    ctx.setState([...ctx.getState(), action.label]);
  }

  @Action(RemoveLabel)
  removeLabel(ctx: StateContext<Label[]>, action: AddLabel): void {
    const labels = ctx.getState();
    const labelIndex = labels.find(item => item.pk === action.label.pk);

    if (labelIndex) {
      labels.splice(labels.indexOf(labelIndex), 1);
      ctx.setState([...labels]);
    }
  }

  @Action(UpdateLabel)
  updateLabel(ctx: StateContext<Label[]>, action: UpdateLabel): void {
    console.log(action.label);

    const labels = ctx.getState();
    const labelIndex = labels.find(item => item.pk === action.label.pk);

    if (labelIndex) {
      labels.splice(labels.indexOf(labelIndex), 1, action.label);
      ctx.setState([...labels]);
    }
  }
}
