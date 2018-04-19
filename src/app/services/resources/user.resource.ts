import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { ResourceInstance } from 'ngx-resource-factory/resource/resource-instance';


export class User extends ResourceInstance {
    pk: number;
    url: string;
    username: string;
    email: string;
}

@Injectable()
@ResourceConfiguration({
    name: 'UserResource',
    url: environment.apiUrl + 'user/:pk/',
    pkAttr: 'pk',
    instanceClass: User,
    stripTrailingSlashes: false,
})
export class UserResource extends Resource<User> {

}
