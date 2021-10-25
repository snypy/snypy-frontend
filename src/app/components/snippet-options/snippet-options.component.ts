import { Component, ElementRef, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Observable, Subscription } from 'rxjs';
import { SnippetModalComponent } from '../../modals/snippet-modal/snippet-modal.component';
import { AuthResource } from '../../services/resources/auth.resource';
import { Label } from '../../services/resources/label.resource';
import { Snippet, SnippetResource } from '../../services/resources/snippet.resource';
import { SnippetLabelResource } from '../../services/resources/snippetlabel.resource';
import { User } from '../../services/resources/user.resource';
import { LabelState } from '../../state/label/label.state';
import { RemoveSnippet, SetActiveSnippet } from '../../state/snippet/snippet.actions';

@Component({
  selector: 'app-snippet-options',
  templateUrl: './snippet-options.component.html',
  styleUrls: ['./snippet-options.component.scss'],
})
export class SnippetOptionsComponent implements OnInit, OnDestroy {
  activeSnippet: ResourceModel<Snippet> = null;
  labels: Label[] = [];
  activeLabels: number[] = [];
  currentUser: ResourceModel<User>;

  availableLabelsSubscription: Subscription;
  snippetLoaderSubscription: Subscription;

  @Select(LabelState) labels$: Observable<Label[]>;
  @Select(state => state.snippet.activeSnippet) activeSnippet$: Observable<Snippet>;

  constructor(
    private snippetLabelResource: SnippetLabelResource,
    private authResource: AuthResource,
    private modalService: NgbModal,
    private snippetResource: SnippetResource,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authResource.currentUser;

    this.availableLabelsSubscription = this.activeSnippet$.subscribe(snippet => {
      if (snippet) {
        this.activeSnippet = this.snippetResource.create(snippet);
        this.activeLabels = this.activeSnippet.labels;
      }
    });

    this.snippetLoaderSubscription = this.labels$.subscribe(data => {
      this.labels = data;
    });
  }

  editSnippet(): void {
    const modalRef = this.modalService.open(SnippetModalComponent, { size: 'lg' });

    modalRef.componentInstance.snippet = this.activeSnippet;

    modalRef.result.then(
      result => {
        this.store.dispatch(new SetActiveSnippet(result));
      },
      reason => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  deleteSnippet(): void {
    this.activeSnippet
      .$remove()
      .$promise.then(() => {
        this.store.dispatch(new RemoveSnippet(this.activeSnippet));
      })
      .catch(error => {
        console.log(error);
      });
  }

  openDeleteModal(content: TemplateRef<ElementRef>): void {
    this.modalService.open(content).result.then(
      () => {
        this.deleteSnippet();
      },
      reason => {
        console.log(`Dismissed ${reason}`);
      }
    );
  }

  toggleLabel(label: ResourceModel<Label>): void {
    const index = this.activeLabels.indexOf(label.pk);

    if (index > -1) {
      this.snippetLabelResource
        .query({ snippet: this.activeSnippet.pk, label: label.pk })
        .$promise.then(data => {
          if (data.length == 1) {
            data[0]
              .$remove()
              .$promise.then(() => {
                this.activeLabels.splice(index, 1);
              })
              .catch(reason => {
                console.log('Cannot delete snippet label');
                console.log(reason);
              });
          } else {
            console.log('Snippet label not found');
          }
        })
        .catch(reason => {
          console.log('Cannot fetch snippet label');
          console.log(reason);
        });
    } else {
      this.snippetLabelResource
        .save({}, { snippet: this.activeSnippet.pk, label: label.pk })
        .$promise.then(() => {
          this.activeLabels.push(label.pk);
        })
        .catch(reason => {
          console.log('Cannot add snippet label');
          console.log(reason);
        });
    }
  }

  ngOnDestroy(): void {
    this.availableLabelsSubscription.unsubscribe();
    this.snippetLoaderSubscription.unsubscribe();
  }
}
