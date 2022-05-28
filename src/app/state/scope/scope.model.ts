import { Team } from '@snypy/rest-client';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { User } from '../../services/resources/user.resource';

export interface ScopeModel {
  area: 'user' | 'team' | 'global' | null;
  value: ResourceModel<User> | Team;
}
