import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { ResourceInstance } from 'ngx-resource-factory/resource/resource-instance';

export class SnippetLabel extends ResourceInstance {
  pk: number;
  url: string;
  snippet: number;
  label: number;
}

@Injectable()
@ResourceConfiguration({
  name: 'SnippetLabelResource',
  url: environment.apiUrl + 'snippetlabel/:pk/',
  pkAttr: 'pk',
  instanceClass: SnippetLabel,
  stripTrailingSlashes: false,
})
export class SnippetLabelResource extends Resource<SnippetLabel> {
  // TODO: add explicit constructor
}
