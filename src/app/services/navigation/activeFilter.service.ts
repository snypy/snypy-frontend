import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SnippetLoaderService } from './snippetLoader.service';


export interface Filter {
    area: 'main'|'labels'|'languages'|'members';
    value: string|number;
}


@Injectable()
export class ActiveFilterService {

    constructor(private snippetLoaderService: SnippetLoaderService) {
    }

    private initialFilter: Filter = {
        area: 'main',
        value: 'all',
    };
    filterUpdated = new BehaviorSubject<Filter>(this.initialFilter);

    updateFilter(area: 'main'|'labels'|'languages'|'members', value: string|number) {
        this.filterUpdated.next({
            area: area,
            value: value,
        });

        switch (area) {
            case 'main':
                switch (value) {
                    case 'all':
                        this.updateSnippetFilter({});
                        break;
                    case 'favorites':
                        console.log('Not implemented');
                        break;
                    case 'unlabeled':
                    this.updateSnippetFilter({'labeled': 'False'});
                        break;
                    case 'public':
                        this.updateSnippetFilter({'visibility': 'PUBLIC'});
                        break;
                    case 'private':
                        this.updateSnippetFilter({'visibility': 'PRIVATE'});
                        break;
                    case 'shared-by-me':
                        console.log('Not implemented');
                        break;
                    case 'shared-with-me':
                        console.log('Not implemented');
                        break;
                    default:
                        console.log('Undefined main area value" ' + value);
                        break;
                }
                break;
            case 'labels':
                this.updateSnippetFilter({'labels': value});
                break;
            case 'languages':
                this.updateSnippetFilter({'files__language': value});
                break;
            default:
                console.log('Undefined filter area" ' + area);
                break;
        }
    }

    private updateSnippetFilter(filter: {}) {
      this.snippetLoaderService.updateSnippetFilter(filter);
    }
}
