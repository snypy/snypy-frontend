import { Component, OnInit } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

import { Label } from '../../services/resources/label.resource';
import { ActiveFilterService, Filter } from '../../services/navigation/activeFilter.service';
import { AvailableLabelsService } from '../../services/navigation/availableLabels.service';
import { LabelModalComponent } from '../label-modal/label-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  currentUser = 1;
  labels: ResourceModel<Label>[] = [];

  activeFilter: Filter;

  constructor(private availableLabelsService: AvailableLabelsService,
              private activeFilterService: ActiveFilterService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.activeFilterService.filterUpdated.subscribe((filter) => {
      this.activeFilter = filter;
    });

    this.availableLabelsService.labelsUpdated.subscribe((data) => {
      this.labels = data;
    });
  }

  updateActiveFilter(value: number) {
    this.activeFilterService.updateFilter('labels', value);
  }

  randomNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }

  addLabel() {
    const modalRef = this.modalService.open(LabelModalComponent, {size: 'sm'});

    modalRef.result.then((result) => {
      this.availableLabelsService.addLabel(result);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  editLabel(label: ResourceModel<Label>) {
    const modalRef = this.modalService.open(LabelModalComponent, {size: 'sm'});

    modalRef.componentInstance.label = label;

    modalRef.result.then((result) => {
      this.availableLabelsService.updateLabel(result);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

}
