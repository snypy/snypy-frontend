import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { User } from '../../services/resources/user.resource';
import { Team } from '../../services/resources/team.resource';

export interface ScopeModel {
  area: 'user' | 'team' | 'global' | null;
  value: ResourceModel<User | Team>;
}
