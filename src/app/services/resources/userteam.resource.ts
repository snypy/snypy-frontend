import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { ResourceInstance } from 'ngx-resource-factory/resource/resource-instance';


export class UserTeam extends ResourceInstance {
    pk: number;
    url: string;
    user: number;
    team: number;
}

@Injectable()
@ResourceConfiguration({
    name: 'UserTeamResource',
    url: environment.apiUrl + 'userteam/:pk/',
    pkAttr: 'pk',
    instanceClass: UserTeam,
    stripTrailingSlashes: false,
})
export class UserTeamResource extends Resource<UserTeam> {
}
