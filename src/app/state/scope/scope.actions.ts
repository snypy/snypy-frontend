import { Team } from '@snypy/rest-client';
import { ScopeModel } from './scope.model';

export class UpdateScope {
  static readonly type = '[Scope] Update Scope';
  constructor(public scope: ScopeModel) {}
}

export class UpdateScopeValue {
  static readonly type = '[Scope] Update Scope Value';
  constructor(public value: Team) {}
}

export class RefreshScope {
  static readonly type = '[Scope] Refresh Scope';
}
