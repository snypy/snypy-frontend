import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Snippet } from '../resources/snippet.resource';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';


@Injectable()
export class ActiveSnippetService {

    activeSnippet: ResourceModel<Snippet> = null;
    snippetUpdated = new BehaviorSubject<ResourceModel<Snippet>>(this.activeSnippet);

    updateSnippet(snippet: ResourceModel<Snippet>) {
        this.snippetUpdated.next(snippet);
    }

}
