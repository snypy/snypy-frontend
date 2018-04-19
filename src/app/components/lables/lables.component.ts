import { Component, OnInit } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

import { LabelResource, Label } from '../../services/resources/label.resource';


@Component({
  selector: 'app-lables',
  templateUrl: './lables.component.html',
  styleUrls: ['./lables.component.scss']
})
export class LablesComponent implements OnInit {

  currentUser = 1;
  labels: ResourceModel<Label>[] = [];

  constructor(private labelResource: LabelResource) { }

  ngOnInit() {

    this.labelResource.query({user: this.currentUser}).$promise
      .then((data) => {
        this.labels = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  randomNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }

}
