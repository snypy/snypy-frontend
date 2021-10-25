import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { ResourceInstance } from 'ngx-resource-factory/resource/resource-instance';

export class Team extends ResourceInstance {
  pk: number;
  url: string;
  name: string;
}

@Injectable()
@ResourceConfiguration({
  name: 'TeamResource',
  url: environment.apiUrl + 'team/:pk/',
  pkAttr: 'pk',
  instanceClass: Team,
  stripTrailingSlashes: false,
})
export class TeamResource extends Resource<Team> {
  // TODO: add explicit constructor
}
