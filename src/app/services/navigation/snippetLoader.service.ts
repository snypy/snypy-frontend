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
import { SetActiveSnippet } from "../../state/snippet/snippet.actions";


@Injectable()
export class SnippetLoaderService {

  snippets: ResourceModel<Snippet>[] = [];
  snippetsPromise: Promise<ResourceModel<Snippet>[]>;

  snippetsLoaded = new Subject<ResourceModel<Snippet>[]>();

  snippetFilter = {};
  snippetSearchFilter: string = '';
  snippetOrdering: { key: string, direction: -1 | 1 };

  activeSnippetDeleted = new Subject<number>();

  @Select(ScopeState) scope$: Observable<ScopeModel>;

  constructor(private snippetResource: SnippetResource, private store: Store) {
    this.scope$.subscribe((scope) => {
      if (scope.area) {
        this.snippetsPromise = this.loadSnippets(scope);

        this.snippetsPromise
          .then((data) => {
            this.snippets = data;
            this.sortSnippets();

            if (data.length) {
              this.store.dispatch(new SetActiveSnippet(data[0]));
            }

            this.snippetsLoaded.next(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  private sortSnippets() {
    this.snippetsPromise.then(() => {
      this.snippets.sort((a, b) => {
        const x = a[this.snippetOrdering.key];
        const y = b[this.snippetOrdering.key];

        return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * this.snippetOrdering.direction;
      });

      this.snippetsLoaded.next(this.snippets);
    });
  }

  addNewSnippet(snippet: ResourceModel<Snippet>) {
    this.snippets.unshift(snippet);
    this.store.dispatch(new SetActiveSnippet(snippet));
  }

  deleteSnippet(snippetPk: number) {
    this.activeSnippetDeleted.next(snippetPk);
  }

  updateSnippetFilter(filter: {}) {
    this.snippetFilter = filter;
    this.store.dispatch(new RefreshScope())
  }

  updateSnippetSearchFilter(filter: string) {
    this.snippetSearchFilter = filter;
    this.store.dispatch(new RefreshScope())
  }

  updateSnippetOrder(key: string, direction: -1 | 1) {
    this.snippetOrdering = {
      key: key,
      direction: direction,
    };

    this.sortSnippets();
  }

  private loadSnippets(scope: ScopeModel) {
    let payload = {};

    /**
     * Scope specific filters
     */
    switch (scope.area) {
      case 'user':
        let user = scope.value as ResourceModel<User>;
        payload['user'] = user.pk;
        payload['team_is_null'] = 'True';
        break;
      case 'team':
        let team = scope.value as ResourceModel<Team>;
        payload['team'] = team.pk;
        break;
    }

    return this.snippetResource.query({
      ...payload,
      ...this.snippetFilter,
      search: this.snippetSearchFilter,
    }).$promise;
  }
}
