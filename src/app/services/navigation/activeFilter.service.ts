import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SnippetLoaderService } from './snippetLoader.service';


export interface Filter {
    area: 'main'|'labels'|'languages';
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

    updateFilter(area: 'main'|'labels'|'languages', value: string|number) {
        this.filterUpdated.next({
            area: area,
            value: value,
        });

        switch (area) {
            case 'main':
                switch (value) {
                    case 'all':
                        this.snippetLoaderService.updateSnippetFilter({});
                        break;
                    case 'favorites':
                        console.log('Not implemented');
                        break;
                    case 'unlabeled':
                    this.snippetLoaderService.updateSnippetFilter({'labeled': 'False'});
                        break;
                    case 'public':
                        this.snippetLoaderService.updateSnippetFilter({'visibility': 'PUBLIC'});
                        break;
                    case 'private':
                        this.snippetLoaderService.updateSnippetFilter({'visibility': 'PRIVATE'});
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
                this.snippetLoaderService.updateSnippetFilter({'labels': value});
                break;
            case 'languages':
                this.snippetLoaderService.updateSnippetFilter({'files__language': value});
                break;
            default:
                console.log('Undefined filter area" ' + area);
                break;
        }
    }

}
