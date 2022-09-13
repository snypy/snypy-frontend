import { Label } from '@snypy/rest-client';

export class UpdateLabels {
  static readonly type = '[Labels] Update Labels';
}

export class UpdateLabel {
  static readonly type = '[Labels] Update Label';
  constructor(public label: Label) {}
}

export class AddLabel {
  static readonly type = '[Labels] Add Label';
  constructor(public label: Label) {}
}

export class RemoveLabel {
  static readonly type = '[Labels] Remove Label';
  constructor(public label: Label) {}
}
