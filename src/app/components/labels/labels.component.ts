import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Observable, Subscription } from 'rxjs';
import { LabelDeleteModalComponent } from '../../modals/label-delete-modal/label-delete-modal.component';
import { LabelModalComponent } from '../../modals/label-modal/label-modal.component';
import { ActiveFilterService, Filter } from '../../services/navigation/activeFilter.service';
import { Label } from '../../services/resources/label.resource';
import { AddLabel, RemoveLabel, UpdateLabel } from '../../state/label/label.actions';
import { LabelState } from '../../state/label/label.state';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss'],
})
export class LabelsComponent implements OnInit, OnDestroy {
  labels: Label[] = [];

  activeFilter: Filter;

  activeFilterSubscription: Subscription;
  availableLabelsSubscription: Subscription;

  @Select(LabelState) labels$: Observable<Label[]>;

  constructor(private activeFilterService: ActiveFilterService, private modalService: NgbModal, private store: Store) {}

  ngOnInit(): void {
    this.activeFilterSubscription = this.activeFilterService.filterUpdated.subscribe(filter => {
      this.activeFilter = filter;
    });

    this.availableLabelsSubscription = this.labels$.subscribe(data => {
      this.labels = data;
    });
  }

  updateActiveFilter(value: number): void {
    this.activeFilterService.updateFilter('labels', value);
  }

  addLabel(): void {
    const modalRef = this.modalService.open(LabelModalComponent, { size: 'sm' });

    modalRef.result.then(
      result => {
        result.snippet_count = 0;
        this.store.dispatch(new AddLabel(result));
      },
      reason => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  editLabel(label: ResourceModel<Label>): void {
    const modalRef = this.modalService.open(LabelModalComponent, { size: 'sm' });
    modalRef.componentInstance.label = label;

    modalRef.result.then(
      result => {
        this.store.dispatch(new UpdateLabel(result));
      },
      reason => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  deleteLabel(label: ResourceModel<Label>): void {
    const modalRef = this.modalService.open(LabelDeleteModalComponent, { size: 'sm' });
    modalRef.componentInstance.label = label;

    modalRef.result.then(
      () => {
        this.store.dispatch(new RemoveLabel(label));
      },
      reason => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.activeFilterSubscription.unsubscribe();
    this.availableLabelsSubscription.unsubscribe();
  }
}
