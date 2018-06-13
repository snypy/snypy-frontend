import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveFilterService, Filter } from "../../services/navigation/activeFilter.service";
import { ActiveScopeService, Scope } from "../../services/navigation/activeScope.service";
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { UserTeam, UserTeamResource } from "../../services/resources/userteam.resource";
import { Team } from "../../services/resources/team.resource";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit, OnDestroy {

  activeFilter: Filter;
  members: ResourceModel<UserTeam>[] = [];

  filterSubscription: Subscription;
  scopeSubscription: Subscription;

  constructor(private activeFilterService: ActiveFilterService,
              private activeScopeService: ActiveScopeService,
              private userTeamResource: UserTeamResource,) {
  }

  ngOnInit() {
    /**
     * Initial member loading
     */
    this.loadMembers();

    this.filterSubscription = this.activeFilterService.filterUpdated.subscribe((filter) => {
      this.activeFilter = filter;
    });

    this.scopeSubscription = this.activeScopeService.scopeUpdated.subscribe((scope: Scope) => {
      this.loadMembers();
    });
  }

  loadMembers() {
    let scope = this.activeScopeService.getScope();

    if (scope.area == 'team') {
      let team = scope.value as ResourceModel<Team>;

      this.userTeamResource.query({team: team.pk}).$promise
        .then((data) => {
          this.members = data;
        })
        .catch((reason) => {
          console.log("Cannot load teams!");
          console.log(reason);
        })
    }
  }

  updateActiveFilter(value: number) {
    this.activeFilterService.updateFilter('user', value);
  }

  addMember() {
    alert("ToDo: Add Member!");
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
    this.scopeSubscription.unsubscribe();
  }
}
