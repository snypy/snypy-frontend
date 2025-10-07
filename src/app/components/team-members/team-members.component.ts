import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select } from '@ngxs/store';
import { Team } from '@snypy/rest-client';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { TeamMemberDeleteModalComponent } from '../../modals/team-member-delete-modal/team-member-delete-modal.component';
import { TeamMemberModalComponent } from '../../modals/team-member-modal/team-member-modal.component';
import { ActiveFilterService, Filter } from '../../services/navigation/activeFilter.service';
import { AuthResource } from '../../services/resources/auth.resource';
import { ScopeModel } from '../../state/scope/scope.model';
import { ScopeState } from '../../state/scope/scope.state';
import { UserTeam, UserteamService } from '@snypy/rest-client';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss'],
  standalone: false,
})
export class TeamMembersComponent implements OnInit, OnDestroy {
  activeFilter: Filter;
  members: UserTeam[] = [];
  currentUserTeamMembership: UserTeam;

  filterSubscription: Subscription;
  scopeSubscription: Subscription;

  scope: ScopeModel;

  @Select(ScopeState) scope$: Observable<ScopeModel>;

  constructor(
    private activeFilterService: ActiveFilterService,
    private userteamService: UserteamService,
    private modalService: NgbModal,
    private authResource: AuthResource
  ) {}

  ngOnInit(): void {
    /**
     * Initial member loading
     */
    this.filterSubscription = this.activeFilterService.filterUpdated.subscribe(filter => {
      this.activeFilter = filter;
    });

    this.scopeSubscription = this.scope$.subscribe((scope: ScopeModel) => {
      this.scope = scope;
      this.loadMembers();
    });
  }

  loadMembers(): void {
    if (this.scope.area == 'team') {
      const team = this.scope.value as Team;

      firstValueFrom(this.userteamService.userteamList({ team: team.pk }))
        .then(data => {
          this.members = data;
          this.currentUserTeamMembership = this.members.find(member => member.user == this.authResource.currentUser.pk);
        })
        .catch(reason => {
          console.log('Cannot load teams!');
          console.log(reason);
        });
    }
  }

  updateActiveFilter(value: number): void {
    this.activeFilterService.updateFilter('members', value);
  }

  addMember(): void {
    const modalRef = this.modalService.open(TeamMemberModalComponent, { size: 'sm' });

    modalRef.result.then(
      result => {
        this.members.push(result);
      },
      reason => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  editMember(member: UserTeam): void {
    const modalRef = this.modalService.open(TeamMemberModalComponent, { size: 'sm' });
    modalRef.componentInstance.userTeam = member;

    modalRef.result.then(
      result => {
        this.members.splice(this.members.indexOf(member), 1, result);
      },
      reason => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  deleteMember(member: UserTeam): void {
    const modalRef = this.modalService.open(TeamMemberDeleteModalComponent, { size: 'sm' });
    modalRef.componentInstance.userTeam = member;

    modalRef.result.then(
      () => {
        this.members.splice(this.members.indexOf(member), 1);
      },
      reason => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
    this.scopeSubscription.unsubscribe();
  }
}
