import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Snippet } from '../resources/snippet.resource';


@Injectable()
export class ActiveSnippetService {

    activeSnippet: Snippet = null;
    snippetUpdated = new BehaviorSubject<Snippet>(this.activeSnippet);

    updateSnippet(snippet: Snippet) {
        this.snippetUpdated.next(snippet);
    }

}
