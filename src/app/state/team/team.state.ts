import { Injectable } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Action, State, StateContext } from '@ngxs/store';
import { Team, TeamService } from '@snypy/rest-client';
import { firstValueFrom } from 'rxjs';
import { ScopeModel } from '../scope/scope.model';
import { ScopeState } from '../scope/scope.state';
import { AddTeam, UpdateTeam, UpdateTeams } from './team.actions';

@State<Team[]>({
  name: 'teams',
  defaults: [],
})
@Injectable()
export class TeamState {
  constructor(private teamService: TeamService) {}

  @SelectSnapshot(ScopeState)
  private scope: ScopeModel;

  @Action(UpdateTeams)
  async updateTeams(ctx: StateContext<Team[]>): Promise<void> {
    const payload = {};
    ctx.setState(await firstValueFrom(this.teamService.teamList(payload)));
  }

  @Action(AddTeam)
  addTeam(ctx: StateContext<Team[]>, action: AddTeam): void {
    ctx.setState([...ctx.getState(), action.team]);
  }

  @Action(UpdateTeam)
  updateTeam(ctx: StateContext<Team[]>, action: UpdateTeam): void {
    const teams = ctx.getState();
    const teamIndex = teams.find(item => item.pk === action.team.pk);

    if (teamIndex) {
      teams.splice(teams.indexOf(teamIndex), 1, action.team);
      ctx.setState([...teams]);
    }
  }
}
