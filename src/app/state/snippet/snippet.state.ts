import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { Team } from '@snypy/rest-client';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { SnippetResource } from '../../services/resources/snippet.resource';
import { User } from '../../services/resources/user.resource';
import { ScopeModel } from '../scope/scope.model';
import { ScopeState } from '../scope/scope.state';
import {
  AddSnippet,
  RemoveSnippet,
  SetActiveSnippet,
  UpdateSnippetFilter,
  UpdateSnippetOrderingFilter,
  UpdateSnippets,
  UpdateSnippetSearchFilter,
} from './snippet.actions';
import { SnippetModel } from './snippet.model';

@State<SnippetModel>({
  name: 'snippet',
  defaults: {
    activeSnippet: null,
    list: [],
    filter: null,
    searchFilter: '',
    ordering: null,
  },
})
@Injectable()
export class SnippetState {
  constructor(private store: Store, private snippetResource: SnippetResource) {}

  @Action(SetActiveSnippet)
  setActiveSnippet(ctx: StateContext<SnippetModel>, action: SetActiveSnippet): void {
    ctx.patchState({
      activeSnippet: action.snippet,
    });
  }

  @Action(AddSnippet)
  addSnippet(ctx: StateContext<SnippetModel>, action: AddSnippet): void {
    const state = ctx.getState();

    ctx.patchState({
      list: [action.snippet, ...state.list],
    });

    this.store.dispatch(new SetActiveSnippet(action.snippet));
  }

  @Action(RemoveSnippet)
  removeSnippet(ctx: StateContext<SnippetModel>, action: RemoveSnippet): void {
    const snippetList = [...ctx.getState().list];

    const oldSnippet = snippetList.find(item => item.pk === action.snippet.pk);
    if (oldSnippet) {
      snippetList.splice(snippetList.indexOf(oldSnippet), 1);
    }

    ctx.patchState({
      list: snippetList,
    });

    if (snippetList.length) {
      this.store.dispatch(new SetActiveSnippet(snippetList[0]));
    }
    // Todo: handle null case for active snippet
  }

  @Action(UpdateSnippetFilter)
  updateSnippetFilter(ctx: StateContext<SnippetModel>, action: UpdateSnippetFilter): void {
    ctx.patchState({
      filter: action.filter,
    });
    if (action.reload) {
      this.store.dispatch(new UpdateSnippets());
    }
  }

  @Action(UpdateSnippetOrderingFilter)
  updateSnippetOrderingFilter(ctx: StateContext<SnippetModel>, action: UpdateSnippetOrderingFilter): void {
    ctx.patchState({
      ordering: action.ordering,
    });

    this.updateOrdering(ctx.getState());
  }

  @Action(UpdateSnippetSearchFilter)
  updateSnippetSearchFilter(ctx: StateContext<SnippetModel>, action: UpdateSnippetSearchFilter): void {
    ctx.patchState({
      searchFilter: action.filter,
    });
    this.store.dispatch(new UpdateSnippets());
    // ToDo: consider using RefreshScope action to also change the counters in labels and language
  }

  @Action(UpdateSnippets)
  async updateSnippets(ctx: StateContext<SnippetModel>): Promise<void> {
    const state = ctx.getState();
    const scope = this.store.selectSnapshot<ScopeModel>(ScopeState);
    const filter = {};

    switch (scope.area) {
      case 'user':
        const user = scope.value as ResourceModel<User>;
        filter['user'] = user.pk;
        filter['team_is_null'] = 'True';
        break;
      case 'team':
        const team = scope.value as Team;
        filter['team'] = team.pk;
        break;
    }

    const snippets = await this.snippetResource.query({
      ...filter,
      ...state.filter,
      search: state.searchFilter,
    }).$promise;

    if (snippets.length) {
      this.store.dispatch(new SetActiveSnippet(snippets[0]));
    }

    this.updateOrdering(state);

    ctx.patchState({
      list: snippets,
    });
  }

  private updateOrdering(state: SnippetModel) {
    state.list.sort((a, b) => {
      const x = a[state.ordering.key];
      const y = b[state.ordering.key];

      return (x < y ? -1 : x > y ? 1 : 0) * state.ordering.direction;
    });
  }
}
