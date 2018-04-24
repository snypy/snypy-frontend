import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Snippet } from '../resources/snippet.resource';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ActiveSnippetService {

    activeSnippet: ResourceModel<Snippet> = null;
    snippetUpdated = new BehaviorSubject<ResourceModel<Snippet>>(this.activeSnippet);
    snippetDeleted = new Subject<number>();

    updateSnippet(snippet: ResourceModel<Snippet>) {
        this.snippetUpdated.next(snippet);
    }

    deleteSnippet(snippetPk: number) {
        this.snippetDeleted.next(snippetPk);
    }
}
