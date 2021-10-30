import { Injectable } from '@angular/core';
import { ResourceConfiguration } from 'ngx-resource-factory/resource/resource-configuration';
import { environment } from '../../../environments/environment';
import { Resource } from 'ngx-resource-factory/resource/resource';
import { ResourceAction } from 'ngx-resource-factory/resource/resource-action';
import { ResourceActionHttpMethod } from 'ngx-resource-factory/resource/resource-action-http-method';
import { ResourceActionMethod } from 'ngx-resource-factory/resource/resource-action-method';

export interface PasswordResetPayload {
  email: string;
}

@Injectable()
@ResourceConfiguration({
  name: 'PasswordResetResource',
  url: environment.apiUrl + 'password_reset/',
  pkAttr: null,
  stripTrailingSlashes: false,
})
export class PasswordResetResource extends Resource<any> {
  @ResourceAction({
    method: ResourceActionHttpMethod.POST,
    isList: false,
    invalidateCache: true,
    urlSuffix: 'validate_token/',
  })
  validate_token: ResourceActionMethod<Record<string, unknown>, any, any>;

  @ResourceAction({
    method: ResourceActionHttpMethod.POST,
    isList: false,
    invalidateCache: true,
    urlSuffix: 'confirm/',
  })
  confirm: ResourceActionMethod<Record<string, unknown>, any, any>;
}
