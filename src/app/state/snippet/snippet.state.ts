import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { SnippetModel } from "./snippet.model";
import { SetActiveSnippet } from "./snippet.actions";


@State<SnippetModel>({
  name: 'snippet',
  defaults: {
    activeSnippet: null,
    list: [],
  }
})
@Injectable()
export class SnippetState {

  @Action(SetActiveSnippet)
  setActiveSnippet(ctx: StateContext<SnippetModel>, action: SetActiveSnippet) {
    ctx.patchState({
      activeSnippet: action.snippet
    });
  }

}
