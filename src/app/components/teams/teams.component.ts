import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Team, TeamService } from '@snypy/rest-client';
import { Observable } from 'rxjs';
import { TeamModalComponent } from '../../modals/team-modal/team-modal.component';
import { AddTeam } from '../../state/team/team.actions';
import { TeamState } from '../../state/team/team.state';
import { UpdateScope } from '../../state/scope/scope.actions';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent {
  teams: Team[] = [];

  @Select(TeamState) teams$: Observable<Team[]>;

  constructor(private store: Store, private modalService: NgbModal, private router: Router, private teamService: TeamService) {}

  addTeam(): void {
    const modalRef = this.modalService.open(TeamModalComponent, { size: 'sm' });

    modalRef.result.then(
      result => {
        this.store.dispatch(new AddTeam(result));
      },
      reason => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  // Custom navigation to team to prevent full page reload
  navigateToTeam(teamId: string): void {
    // Convert string teamId to number as required by the API
    const teamIdNumber = parseInt(teamId, 10);

    this.teamService.teamRetrieve({ id: teamIdNumber }).subscribe({
      next: team => {
        this.store.dispatch(
          new UpdateScope({
            area: 'team',
            value: team,
          })
        );
        this.router.navigateByUrl(`/team/${teamId}`, { skipLocationChange: true });
      },
      error: () => {
        console.log('Failed to load Team');
      },
    });
  }
}
