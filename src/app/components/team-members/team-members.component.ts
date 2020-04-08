import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveFilterService, Filter } from "../../services/navigation/activeFilter.service";
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { UserTeam, UserTeamResource } from "../../services/resources/userteam.resource";
import { Team } from "../../services/resources/team.resource";
import { Observable, Subscription } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TeamMemberModalComponent } from "../../modals/team-member-modal/team-member-modal.component";
import { TeamMemberDeleteModalComponent } from "../../modals/team-member-delete-modal/team-member-delete-modal.component";
import { AuthResource } from "../../services/resources/auth.resource";
import { ScopeState } from "../../state/scope/scope.state";
import { ScopeModel } from "../../state/scope/scope.model";
import { Select } from "@ngxs/store";

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: [
    './team-members.component.scss',
  ]
})
export class TeamMembersComponent implements OnInit, OnDestroy {

  activeFilter: Filter;
  members: ResourceModel<UserTeam>[] = [];
  currentUserTeamMembership: ResourceModel<UserTeam>;

  filterSubscription: Subscription;
  scopeSubscription: Subscription;

  scope: ScopeModel;

  @Select(ScopeState) scope$: Observable<ScopeModel>;

  constructor(private activeFilterService: ActiveFilterService,
              private userTeamResource: UserTeamResource,
              private modalService: NgbModal,
              private authResource: AuthResource) {
  }

  ngOnInit() {
    /**
     * Initial member loading
     */
    this.filterSubscription = this.activeFilterService.filterUpdated.subscribe((filter) => {
      this.activeFilter = filter;
    });

    this.scopeSubscription = this.scope$.subscribe((scope: ScopeModel) => {
      this.scope = scope;
      this.loadMembers();
    });
  }

  loadMembers() {
    if (this.scope.area == 'team') {
      let team = this.scope.value as ResourceModel<Team>;

      this.userTeamResource.query({team: team.pk}).$promise
        .then((data) => {
          this.members = data;
          this.currentUserTeamMembership = this.members.find(member => member.user == this.authResource.currentUser.pk);
        })
        .catch((reason) => {
          console.log("Cannot load teams!");
          console.log(reason);
        })
    }
  }

  updateActiveFilter(value: number) {
    this.activeFilterService.updateFilter('members', value);
  }

  addMember() {
    const modalRef = this.modalService.open(TeamMemberModalComponent, {size: 'sm'});

    modalRef.result.then((result) => {
      this.members.push(result);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  editMember(member: ResourceModel<UserTeam>) {
    const modalRef = this.modalService.open(TeamMemberModalComponent, {size: 'sm'});
    modalRef.componentInstance.userTeam = member;

    modalRef.result.then((result) => {
      this.members.splice(this.members.indexOf(member), 1, result);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  deleteMember(member: ResourceModel<UserTeam>) {
    const modalRef = this.modalService.open(TeamMemberDeleteModalComponent, {size: 'sm'});
    modalRef.componentInstance.userTeam = member;

    modalRef.result.then((result) => {
      this.members.splice(this.members.indexOf(member), 1);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
    this.scopeSubscription.unsubscribe();
  }
}
