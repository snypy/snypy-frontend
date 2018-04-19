import { Component, OnInit } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

import { LabelResource, Label } from '../../services/resources/label.resource';
import { ActiveFilterService, Filter } from '../../services/navigation/activeFilter.service';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  currentUser = 1;
  labels: ResourceModel<Label>[] = [];

  activeFilter: Filter;

  constructor(private labelResource: LabelResource,
              private activeFilterService: ActiveFilterService) { }

  ngOnInit() {
    this.activeFilterService.filterUpdated.subscribe((filter) => {
      this.activeFilter = filter;
    });

    this.labelResource.query({user: this.currentUser}).$promise
      .then((data) => {
        this.labels = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateActiveFilter(value: number) {
    this.activeFilterService.updateFilter('labels', value);
  }

  randomNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }

}
