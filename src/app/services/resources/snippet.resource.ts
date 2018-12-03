import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { ResourceInstance } from 'ngx-resource-factory/resource/resource-instance';


export class SnippetFile {
  pk: number;
  url: string;
  language: number;
  name: string;
  content: string;
}

export class Snippet extends ResourceInstance {
  pk: number;
  url: string;
  title: string;
  description: string;
  visibility: string;
  user: number;
  labels: number[];
  files: SnippetFile[];
  team: number;
  user_display: string;
  created_date: string;
  modified_date: string;
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
