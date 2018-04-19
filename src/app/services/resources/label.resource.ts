import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { ResourceInstance } from 'ngx-resource-factory/resource/resource-instance';


export class Label extends ResourceInstance {
    pk: number;
    url: string;
    name: string;
}

@Injectable()
@ResourceConfiguration({
    name: 'LabelResource',
    url: environment.apiUrl + 'label/:pk/',
    pkAttr: 'pk',
    instanceClass: Label,
    stripTrailingSlashes: false,
})
export class LabelResource extends Resource<Label> {
}
