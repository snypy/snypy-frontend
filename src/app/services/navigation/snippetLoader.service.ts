import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Snippet, SnippetResource } from '../resources/snippet.resource';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Subject } from 'rxjs';
import { ActiveScopeService, Scope } from "./activeScope.service";
import { User } from "../resources/user.resource";
import { Team } from "../resources/team.resource";


@Injectable()
export class SnippetLoaderService {

  snippets: ResourceModel<Snippet>[] = [];
  snippetsPromise: Promise<ResourceModel<Snippet>[]>;

  snippetsLoaded = new Subject<ResourceModel<Snippet>[]>();

  snippetFilter = {};
  snippetSearchFilter: string = '';
  snippetOrdering: { key: string, direction: -1 | 1 };

  activeSnippet: ResourceModel<Snippet> = null;
  activeSnippetUpdated = new BehaviorSubject<ResourceModel<Snippet>>(this.activeSnippet);
  activeSnippetDeleted = new Subject<number>();

  constructor(private snippetResource: SnippetResource,
              private activeScopeService: ActiveScopeService) {
  }

  refreshSnippets() {
    this.snippetsPromise = this.loadSnippets();

    this.snippetsPromise
      .then((data) => {
        this.snippets = data;

        if (data.length) {
          this.updateActiveSnippet(data[0]);
        }

        this.snippetsLoaded.next(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sortSnippets() {
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
    this.updateActiveSnippet(snippet);
  }

  updateActiveSnippet(snippet: ResourceModel<Snippet>) {
    this.sortSnippets();
    this.activeSnippetUpdated.next(snippet);
  }

  deleteSnippet(snippetPk: number) {
    this.activeSnippetDeleted.next(snippetPk);
  }

  updateSnippetFilter(filter: {}) {
    this.snippetFilter = filter;
    this.refreshSnippets();
  }

  updateSnippetSearchFilter(filter: string) {
    this.snippetSearchFilter = filter;
    this.refreshSnippets();
  }

  updateSnippetOrder(key: string, direction: -1 | 1) {
    this.snippetOrdering = {
      key: key,
      direction: direction,
    };

    this.sortSnippets();
  }

  private loadSnippets() {
    let payload = {};
    let scope = this.activeScopeService.getScope();

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
