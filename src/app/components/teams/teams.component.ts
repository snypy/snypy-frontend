import { Component, OnInit } from '@angular/core';
import { TeamResource, Team } from '../../services/resources/team.resource';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: ResourceModel<Team>[] = [];

  constructor(private teamResource: TeamResource) { }

  ngOnInit() {
    this.teamResource.query({}, {}).$promise
      .then((data) => {
        this.teams = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
