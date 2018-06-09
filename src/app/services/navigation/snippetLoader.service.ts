import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Snippet, SnippetResource } from '../resources/snippet.resource';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Subject } from 'rxjs/Subject';
import { AuthResource } from "../resources/auth.resource";


@Injectable()
export class SnippetLoaderService {

    snippets: ResourceModel<Snippet>[] = [];
    snippetsPromise: Promise<ResourceModel<Snippet>[]>;

    snippetsLoaded = new Subject<ResourceModel<Snippet>[]>();

    snippetFilter = {};
    snippetOrdering: {key: string, direction: -1|1};

    activeSnippet: ResourceModel<Snippet> = null;
    activeSnippetUpdated = new BehaviorSubject<ResourceModel<Snippet>>(this.activeSnippet);
    activeSnippetDeleted = new Subject<number>();

    constructor(private snippetResource: SnippetResource,
                private authResource: AuthResource) {
        this.refreshSnippets();
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

    loadSnippets() {
        return this.snippetResource.query({
          user: this.authResource.currentUser.pk,
          ...this.snippetFilter,
        }).$promise;
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

    updateSnippetOrder(key: string, direction: -1|1) {
        this.snippetOrdering = {
            key: key,
            direction: direction,
        };

        this.sortSnippets();
    }
}
