import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LabelDeleteModalComponent } from '../../modals/label-delete-modal/label-delete-modal.component';
import { LabelModalComponent } from '../../modals/label-modal/label-modal.component';
import { ActiveFilterService, Filter } from '../../services/navigation/activeFilter.service';
import { Label } from '@snypy/rest-client';
import { AddLabel, RemoveLabel, UpdateLabel } from '../../state/label/label.actions';
import { LabelState } from '../../state/label/label.state';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LabelsComponent {
  activeFilter$: Observable<Filter>;
  activeFilterValue$: Observable<string | number>;
  activeFilterArea$: Observable<string>;

  @Select(LabelState) labels$: Observable<Label[]>;

  constructor(private activeFilterService: ActiveFilterService, private modalService: NgbModal, private store: Store) {
    this.activeFilter$ = this.activeFilterService.filterUpdated.pipe(map(filter => filter));
    this.activeFilterValue$ = this.activeFilter$.pipe(map(filter => filter.value));
    this.activeFilterArea$ = this.activeFilter$.pipe(map(filter => filter.area));
  }

  trackByFn(index: number, label: Label): number {
    return label.pk;
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

  editLabel(label: Label): void {
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

  deleteLabel(label: Label): void {
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
}
