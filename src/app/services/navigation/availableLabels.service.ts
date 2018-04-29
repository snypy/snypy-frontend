import { Injectable } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Label, LabelResource } from '../resources/label.resource';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AvailableLabelsService {

    currentUser = 1;

    labels: ResourceModel<Label>[] = [];
    labelsPromise: Promise<ResourceModel<Label>[]> = null;
    labelsUpdated = new Subject<ResourceModel<Label>[]>();

    constructor(private labelResource: LabelResource) {
        this.labelsPromise = this.labelResource.query({user: this.currentUser}).$promise;

        this.labelsPromise
            .then((data) => {
                this.labels = data;
                this.triggerLabelsUpdated();
            })
            .catch((error) => {
                console.log(error);
            });
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

    private triggerLabelsUpdated() {
        this.labelsUpdated.next(this.labels);
    }
}
