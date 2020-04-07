import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { SelectSnapshot } from "@ngxs-labs/select-snapshot";
import { ScopeModel } from "../scope/scope.model";
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { User } from "../../services/resources/user.resource";
import { Team } from "../../services/resources/team.resource";
import { ScopeState } from "../scope/scope.state";
import { Label, LabelResource } from "../../services/resources/label.resource";
import { AddLabel, RemoveLabel, UpdateLabel, UpdateLabels } from "./label.actions";
import { UpdateScope } from "../scope/scope.actions";


@State<Label[]>({
  name: 'labels',
  defaults: []
})
@Injectable()
export class LabelState {

  constructor(private labelResource: LabelResource) {
  }

  @SelectSnapshot(ScopeState)
  private scope: ScopeModel;

  @Action(UpdateLabels)
  async updateLanguages(ctx: StateContext<Label[]>) {
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

    ctx.setState(await this.labelResource.query({...payload,}).$promise);
  }

  @Action(AddLabel)
  addLabel(ctx: StateContext<Label[]>, action: AddLabel) {
    ctx.setState([
      ...ctx.getState(),
      action.label,
    ])
  }

  @Action(RemoveLabel)
  removeLabel(ctx: StateContext<Label[]>, action: AddLabel) {
    const labels = ctx.getState();
    const labelIndex = labels.find((item) => item.pk === action.label.pk);

    if (labelIndex) {
      labels.splice(labels.indexOf(labelIndex), 1);
      ctx.setState([...labels]);
    }
  }

  @Action(UpdateLabel)
  updateLabel(ctx: StateContext<Label[]>, action: UpdateLabel) {

    console.log(action.label);

    const labels = ctx.getState();
    const labelIndex = labels.find((item) => item.pk === action.label.pk);

    if (labelIndex) {
      labels.splice(labels.indexOf(labelIndex), 1, action.label);
      ctx.setState([...labels]);
    }
  }


}
