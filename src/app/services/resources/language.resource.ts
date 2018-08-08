import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { ResourceInstance } from 'ngx-resource-factory/resource/resource-instance';


export class Language extends ResourceInstance {
    pk: number;
    url: string;
    name: string;
    snippet_count: number;
}

@Injectable()
@ResourceConfiguration({
    name: 'LanguageResource',
    url: environment.apiUrl + 'language/:pk/',
    pkAttr: 'pk',
    instanceClass: Language,
    stripTrailingSlashes: false,
})
export class LanguageResource extends Resource<Language> {
}
