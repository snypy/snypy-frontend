import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { RefreshScope, UpdateScope, UpdateScopeValue } from './scope.actions';
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
  @Selector()
  static getScope(state: ScopeModel): ScopeModel {
    return state;
  }
  @Action(UpdateScope)
  updateScope(ctx: StateContext<ScopeModel>, action: UpdateScope): void {
    ctx.patchState(action.scope);
  }

  @Action(UpdateScopeValue)
  updateScopeValue(ctx: StateContext<ScopeModel>, action: UpdateScopeValue): void {
    ctx.patchState({
      value: action.value,
    });
  }

  @Action(RefreshScope)
  refreshScope(ctx: StateContext<ScopeModel>): void {
    const state = ctx.getState();
    ctx.setState({ ...state });
  }
}
