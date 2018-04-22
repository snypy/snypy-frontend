import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { ResourceInstance } from 'ngx-resource-factory/resource/resource-instance';


export class File extends ResourceInstance {
    pk: number;
    url: string;
    snippet: number;
    language: number;
    name: string;
    content: string;
}

@Injectable()
@ResourceConfiguration({
    name: 'FileResource',
    url: environment.apiUrl + 'file/:pk/',
    pkAttr: 'pk',
    instanceClass: File,
    stripTrailingSlashes: false,
})
export class FileResource extends Resource<File> {
}
