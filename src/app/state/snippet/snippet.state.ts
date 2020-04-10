import { Action, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { SnippetModel } from "./snippet.model";
import { SetActiveSnippet, UpdateSnippetFilter, UpdateSnippetOrderingFilter, UpdateSnippets } from "./snippet.actions";
import { ScopeModel } from "../scope/scope.model";
import { ScopeState } from "../scope/scope.state";
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { User } from "../../services/resources/user.resource";
import { Team } from "../../services/resources/team.resource";
import { SnippetResource } from "../../services/resources/snippet.resource";


@State<SnippetModel>({
  name: 'snippet',
  defaults: {
    activeSnippet: null,
    list: [],
    filter: null,
    searchFilter: '',
    ordering: null,
  }
})
@Injectable()
export class SnippetState {

  constructor(private store: Store,
              private snippetResource: SnippetResource) {
  }

  @Action(SetActiveSnippet)
  setActiveSnippet(ctx: StateContext<SnippetModel>, action: SetActiveSnippet) {
    ctx.patchState({
      activeSnippet: action.snippet
    });
  }

  @Action(UpdateSnippetFilter)
  updateSnippetFilter(ctx: StateContext<SnippetModel>, action: UpdateSnippetFilter) {
    ctx.patchState({
      'filter': action.filter
    })
    this.store.dispatch(new UpdateSnippets())
    //this.store.dispatch(new RefreshScope())
  }

  @Action(UpdateSnippetOrderingFilter)
  updateSnippetOrderingFilter(ctx: StateContext<SnippetModel>, action: UpdateSnippetOrderingFilter) {
    ctx.patchState({
      'ordering': action.ordering
    });

    this.updateOrdering(ctx.getState());
  }

  @Action(UpdateSnippets)
  async updateSnippets(ctx: StateContext<SnippetModel>) {
    const state = ctx.getState();
    const scope = this.store.selectSnapshot<ScopeModel>(ScopeState);
    let filter = {};

    switch (scope.area) {
      case 'user':
        let user = scope.value as ResourceModel<User>;
        filter['user'] = user.pk;
        filter['team_is_null'] = 'True';
        break;
      case 'team':
        let team = scope.value as ResourceModel<Team>;
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
      'list': snippets
    })
  }

  private updateOrdering(state: SnippetModel) {

    state.list.sort((a, b) => {
      const x = a[state.ordering.key];
      const y = b[state.ordering.key];

      return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * state.ordering.direction;
    });
  }

}
