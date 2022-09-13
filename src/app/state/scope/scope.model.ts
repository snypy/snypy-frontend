import { Team, User } from '@snypy/rest-client';

export interface ScopeModel {
  area: 'user' | 'team' | 'global' | null;
  value: User | Team;
}
