import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Observable, Subscription } from 'rxjs';
import { SnippetModalComponent } from '../../modals/snippet-modal/snippet-modal.component';
import { Team } from '../../services/resources/team.resource';
import { RefreshScope } from '../../state/scope/scope.actions';
import { ScopeModel } from '../../state/scope/scope.model';
import { ScopeState } from '../../state/scope/scope.state';
import { AddSnippet } from '../../state/snippet/snippet.actions';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.scss'],
})
export class ViewInfoComponent implements OnInit, OnDestroy {
  heading = 'My Snippets';

  scopeUpdatedSubscription: Subscription;

  @Select(ScopeState) scope$: Observable<ScopeModel>;

  constructor(private store: Store, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.scopeUpdatedSubscription = this.scope$.subscribe((scope: ScopeModel) => {
      switch (scope.area) {
        case 'user':
          this.heading = 'My Snippets';
          break;
        case 'team':
          const team = scope.value as ResourceModel<Team>;
          this.heading = team.name;
          break;
        case 'global':
          this.heading = 'Global';
          break;
      }
    });
  }

  addSnippet(): void {
    const modalRef = this.modalService.open(SnippetModalComponent, { size: 'lg' });

    modalRef.result.then(
      result => {
        this.store.dispatch(new AddSnippet(result));
      },
      reason => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  triggerReload(): void {
    this.store.dispatch(new RefreshScope());
  }

  ngOnDestroy(): void {
    this.scopeUpdatedSubscription.unsubscribe();
  }
}
