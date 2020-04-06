import { Injectable } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Label, LabelResource } from '../resources/label.resource';
import { Subject } from 'rxjs';
import { Team } from "../resources/team.resource";
import { User } from "../resources/user.resource";
import { SelectSnapshot } from "@ngxs-labs/select-snapshot";
import { ScopeState } from "../../state/scope/scope.state";
import { ScopeModel } from "../../state/scope/scope.model";

@Injectable()
export class AvailableLabelsService {

  labels: ResourceModel<Label>[] = [];
  labelsPromise: Promise<ResourceModel<Label>[]> = null;
  labelsUpdated = new Subject<ResourceModel<Label>[]>();

  @SelectSnapshot(ScopeState)
  public scope: ScopeModel;

  constructor(private labelResource: LabelResource) {
  }

  refreshLabels() {
    this.labelsPromise = this.loadLabels();

    this.labelsPromise
      .then((data) => {
        this.labels = data;
        this.triggerLabelsUpdated();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadLabels() {
    let payload = {};
    let scope = this.scope;

    /**
     * Scope specific filters
     */
    switch (scope.area) {
      case 'user':
        let user = scope.value as ResourceModel<User>;
        payload['user'] = user.pk;
        break;
      case 'team':
        let team = scope.value as ResourceModel<Team>;
        payload['team'] = team.pk;
        break;
    }

    return this.labelResource.query({
      ...payload,
    }).$promise;
  }

  updateLabels(labels: ResourceModel<Label>[]) {
    this.labels = labels;
    this.triggerLabelsUpdated();
  }

  updateLabel(label: ResourceModel<Label>) {
    const listLabel = this.labels.find((item) => item.pk === label.pk);

    if (listLabel) {
      this.labels.splice(this.labels.indexOf(listLabel), 1, label);
      this.triggerLabelsUpdated();
    } else {
      this.addLabel(label);
    }
  }

  addLabel(label: ResourceModel<Label>) {
    this.labels.push(label);
    this.triggerLabelsUpdated();
  }

  removeLabel(label: ResourceModel<Label>) {
    const listLabel = this.labels.find((item) => item.pk === label.pk);

    if (listLabel) {
      this.labels.splice(this.labels.indexOf(listLabel), 1);
      this.triggerLabelsUpdated();
    }
  }

  private triggerLabelsUpdated() {
    this.labelsUpdated.next(this.labels);
  }
}
