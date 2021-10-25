import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { RefreshScope, UpdateScope } from './scope.actions';
import { ScopeModel } from './scope.model';

@State<ScopeModel>({
  name: 'scope',
  defaults: {
    area: null,
    value: null,
  },
})
@Injectable()
export class ScopeState {
  @Action(UpdateScope)
  updateScope(ctx: StateContext<ScopeModel>, action: UpdateScope): void {
    ctx.patchState(action.scope);
  }

  @Action(RefreshScope)
  refreshScope(ctx: StateContext<ScopeModel>): void {
    const state = ctx.getState();
    ctx.setState({ ...state });
  }
}
