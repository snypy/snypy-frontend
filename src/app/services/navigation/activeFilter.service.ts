import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export interface Filter {
    area: 'main'|'labels'|'languages';
    value: string|number;
}


@Injectable()
export class ActiveFilterService {

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
    }

}
