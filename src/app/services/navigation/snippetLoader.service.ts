import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Snippet } from '../resources/snippet.resource';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SnippetLoaderService {

    activeSnippet: ResourceModel<Snippet> = null;
    activeSnippetUpdated = new BehaviorSubject<ResourceModel<Snippet>>(this.activeSnippet);
    activeSnippetDeleted = new Subject<number>();

    updateActiveSnippet(snippet: ResourceModel<Snippet>) {
        this.activeSnippetUpdated.next(snippet);
    }

    deleteSnippet(snippetPk: number) {
        this.activeSnippetDeleted.next(snippetPk);
    }
}
