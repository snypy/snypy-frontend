import { Team } from '@snypy/rest-client';

export class UpdateTeams {
  static readonly type = '[Teams] Update Teams';
}

export class UpdateTeam {
  static readonly type = '[Teams] Update Team';
  constructor(public team: Team) {}
}

export class AddTeam {
  static readonly type = '[Teams] Add Team';
  constructor(public team: Team) {}
}

export class RemoveTeam {
  static readonly type = '[Teams] Remove Team';
  constructor(public team: Team) {}
}
