import {ScopeModel} from "./scope.model";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {RefreshScope, UpdateScope} from "./scope.actions";


@State<ScopeModel>({
  name: 'scope',
  defaults: {
    area: null,
    value: null,
  }
})
@Injectable()
export class ScopeState {

  @Action(UpdateScope)
  updateScope(ctx: StateContext<ScopeModel>, action: UpdateScope) {
    ctx.patchState(action.scope);
  }

  @Action(RefreshScope)
  refreshScope(ctx: StateContext<ScopeModel>) {
    const state = ctx.getState();
    ctx.setState({...state});
  }

}

