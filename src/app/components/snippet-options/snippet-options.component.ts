import { ChangeDetectionStrategy, Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { firstValueFrom, Observable } from 'rxjs';
import { SnippetModalComponent } from '../../modals/snippet-modal/snippet-modal.component';
import { AuthResource } from '../../services/resources/auth.resource';
import { Label } from '@snypy/rest-client';
import { Snippet, SnippetResource } from '../../services/resources/snippet.resource';
import { User } from '../../services/resources/user.resource';
import { UpdateLabels } from '../../state/label/label.actions';
import { LabelState } from '../../state/label/label.state';
import { RemoveSnippet } from '../../state/snippet/snippet.actions';
import { SnippetlabelService } from '@snypy/rest-client';
@UntilDestroy()
@Component({
  selector: 'app-snippet-options',
  templateUrl: './snippet-options.component.html',
  styleUrls: ['./snippet-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetOptionsComponent implements OnInit {
  activeSnippetResource: ResourceModel<Snippet> = null;
  activeLabels: number[] = [];
  currentUser: ResourceModel<User>;
  permalink = '';

  @Select(LabelState) labels$: Observable<Label[]>;
  @Select(state => state.snippet.activeSnippet) activeSnippet$: Observable<Snippet>;

  constructor(
    private snippetlabelService: SnippetlabelService,
    private authResource: AuthResource,
    private modalService: NgbModal,
    private snippetResource: SnippetResource,
    private store: Store,
    private window: Window
  ) {}

  trackByFn(index: number, label: Label): number {
    return label.pk;
  }

  ngOnInit(): void {
    this.currentUser = this.authResource.currentUser;

    this.activeSnippet$.pipe(untilDestroyed(this)).subscribe(snippet => {
      if (snippet) {
        this.activeSnippetResource = this.snippetResource.create(snippet);
        this.activeLabels = this.activeSnippetResource.labels;

        this.permalink = this.window.location.protocol + '//' + this.window.location.host + '/snippet/' + snippet.pk;
      }
    });
  }

  editSnippet(): void {
    const modalRef = this.modalService.open(SnippetModalComponent, { size: 'lg' });

    modalRef.componentInstance.snippet = this.activeSnippetResource;

    modalRef.result.then(
      () => {
        console.log('Snippet saved');
      },
      reason => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  deleteSnippet(): void {
    this.activeSnippetResource
      .$remove()
      .$promise.then(() => {
        this.store.dispatch(new RemoveSnippet(this.activeSnippetResource));
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
      firstValueFrom(
        this.snippetlabelService.snippetlabelList({
          snippet: this.activeSnippetResource.pk,
          label: label.pk,
        })
      )
        .then(data => {
          if (data.length >= 1) {
            firstValueFrom(this.snippetlabelService.snippetlabelDestroy({ id: data[0].pk }))
              .then(() => {
                this.activeLabels.splice(index, 1);
                this.store.dispatch(new UpdateLabels());
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
      firstValueFrom(
        this.snippetlabelService.snippetlabelCreate({
          snippetLabelRequest: { snippet: this.activeSnippetResource.pk, label: label.pk },
        })
      )
        .then(() => {
          this.activeLabels.push(label.pk);
          this.store.dispatch(new UpdateLabels());
        })
        .catch(reason => {
          console.log('Cannot add snippet label');
          console.log(reason);
        });
    }
  }
}
