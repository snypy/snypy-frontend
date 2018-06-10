import { Component, OnInit } from '@angular/core';
import { ActiveFilterService, Filter } from "../../services/navigation/activeFilter.service";

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

  members = [
    {pk: 1, username: 'user1'},
    {pk: 2, username: 'user2'},
  ];

  activeFilter: Filter;

  constructor(private activeFilterService: ActiveFilterService) {
  }

  ngOnInit() {
    this.activeFilterService.filterUpdated.subscribe((filter) => {
      this.activeFilter = filter;
    });
  }

  updateActiveFilter(value: number) {
    this.activeFilterService.updateFilter('user', value);
  }

  addMember() {
    alert("ToDo: Add Member!");
  }

}
