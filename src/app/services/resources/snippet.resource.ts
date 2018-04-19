import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { ResourceInstance } from 'ngx-resource-factory/resource/resource-instance';


export class Snippet extends ResourceInstance {
    pk: number;
    url: string;
    title: string;
    description: string;
    visibility: string;
    user: number;
}

@Injectable()
@ResourceConfiguration({
    name: 'SnippetResource',
    url: environment.apiUrl + 'snippet/:pk/',
    pkAttr: 'pk',
    instanceClass: Snippet,
    stripTrailingSlashes: false,
})
export class SnippetResource extends Resource<Snippet> {
}
