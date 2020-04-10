import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Snippet, SnippetResource } from '../resources/snippet.resource';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Subject } from 'rxjs';
import { User } from "../resources/user.resource";
import { Team } from "../resources/team.resource";
import { ScopeState } from "../../state/scope/scope.state";
import { Select, Store } from "@ngxs/store";
import { ScopeModel } from "../../state/scope/scope.model";
import { RefreshScope } from "../../state/scope/scope.actions";
import { SetActiveSnippet, UpdateSnippets } from "../../state/snippet/snippet.actions";


@Injectable()
export class SnippetLoaderService {

  snippets: ResourceModel<Snippet>[] = [];

  snippetSearchFilter: string = '';

  activeSnippetDeleted = new Subject<number>();

  @Select(ScopeState) scope$: Observable<ScopeModel>;

  constructor(private snippetResource: SnippetResource, private store: Store) {
    this.scope$.subscribe((scope) => {
      if (scope.area) {
        this.store.dispatch(new UpdateSnippets());
      }
    });
  }

  addNewSnippet(snippet: ResourceModel<Snippet>) {
    this.snippets.unshift(snippet);
    this.store.dispatch(new SetActiveSnippet(snippet));
  }

  deleteSnippet(snippetPk: number) {
    this.activeSnippetDeleted.next(snippetPk);
  }

  updateSnippetSearchFilter(filter: string) {
    this.snippetSearchFilter = filter;
    this.store.dispatch(new RefreshScope())
  }

}
