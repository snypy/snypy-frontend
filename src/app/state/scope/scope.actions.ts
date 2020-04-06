import { ScopeModel } from "./scope.model";

export class UpdateScope {
  static readonly type = '[Scope] Update Scope';
  constructor(public scope: ScopeModel) {}
}

export class RefreshScope {
  static readonly type = '[Scope] Refresh Scope';
  constructor() {}
}
