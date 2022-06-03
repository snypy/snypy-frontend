import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Team } from '@snypy/rest-client';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Observable } from 'rxjs';
import { TeamModalComponent } from '../../modals/team-modal/team-modal.component';
import { ActiveFilterService } from '../../services/navigation/activeFilter.service';
import { UpdateScope } from '../../state/scope/scope.actions';
import { AddTeam } from '../../state/team/team.actions';
import { TeamState } from '../../state/team/team.state';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent {
  teams: ResourceModel<Team>[] = [];

  @Select(TeamState) teams$: Observable<Team[]>;

  constructor(private store: Store, private modalService: NgbModal, private activeFilterService: ActiveFilterService) {}

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

  loadTeam(team: Team): void {
    console.log('Loading team!');
    this.activeFilterService.updateFilter('main', 'all', false);
    this.store.dispatch(
      new UpdateScope({
        area: 'team',
        value: team,
      })
    );
  }
}
