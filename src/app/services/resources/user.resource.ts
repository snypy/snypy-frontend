import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { ResourceInstance } from 'ngx-resource-factory/resource/resource-instance';
import { ResourceActionMethod } from "ngx-resource-factory/resource/resource-action-method";
import { ResourceActionHttpMethod } from "ngx-resource-factory/resource/resource-action-http-method";
import { ResourceAction } from "ngx-resource-factory/resource/resource-action";


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

  @ResourceAction({
    method: ResourceActionHttpMethod.GET,
    isList: false,
    invalidateCache: true,
    urlSuffix: 'current/',
  })
  current: ResourceActionMethod<any, any, User>;

}
