import { ChangeDetectionStrategy, Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Label, Snippet, SnippetService, User } from '@snypy/rest-client';
import { firstValueFrom, Observable } from 'rxjs';
import { SnippetModalComponent } from '../../modals/snippet-modal/snippet-modal.component';
import { AuthResource } from '../../services/resources/auth.resource';
import { LabelState } from '../../state/label/label.state';
import { RemoveSnippet, SetActiveSnippet } from '../../state/snippet/snippet.actions';
@UntilDestroy()
@Component({
  selector: 'app-snippet-options',
  templateUrl: './snippet-options.component.html',
  styleUrls: ['./snippet-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SnippetOptionsComponent implements OnInit {
  activeSnippet: Snippet = null;
  activeLabels: number[] = [];
  currentUser: User;
  permalink = '';

  @Select(LabelState) labels$: Observable<Label[]>;
  @Select(state => state.snippet.activeSnippet) activeSnippet$: Observable<Snippet>;

  constructor(
    private authResource: AuthResource,
    private modalService: NgbModal,
    private snippetService: SnippetService,
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
        this.activeSnippet = snippet;
        this.activeLabels = this.activeSnippet.labels;
        this.permalink = this.window.location.protocol + '//' + this.window.location.host + '/snippet/' + snippet.pk;
      }
    });
  }

  editSnippet(): void {
    const modalRef = this.modalService.open(SnippetModalComponent, { size: 'lg' });

    modalRef.componentInstance.snippet = this.activeSnippet;

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
    firstValueFrom(this.snippetService.snippetDestroy({ id: this.activeSnippet.pk }))
      .then(() => {
        this.store.dispatch(new RemoveSnippet(this.activeSnippet));
      })
      .catch(error => {
        console.log(error);
      });
  }

  async toggleFavorite(snippet: Snippet) {
    await firstValueFrom(this.snippetService.snippetFavoriteCreate({ id: snippet.pk }));
    this.store.dispatch(new SetActiveSnippet(await firstValueFrom(this.snippetService.snippetRetrieve({ id: snippet.pk }))));
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
}
