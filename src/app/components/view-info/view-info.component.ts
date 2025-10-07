import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Team } from '@snypy/rest-client';
import { Observable, Subscription } from 'rxjs';
import { SnippetModalComponent } from '../../modals/snippet-modal/snippet-modal.component';
import { TeamModalComponent } from '../../modals/team-modal/team-modal.component';
import { RefreshScope, UpdateScopeValue } from '../../state/scope/scope.actions';
import { ScopeModel } from '../../state/scope/scope.model';
import { ScopeState } from '../../state/scope/scope.state';
import { AddSnippet } from '../../state/snippet/snippet.actions';
import { UpdateTeam } from '../../state/team/team.actions';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.scss'],
  standalone: false,
})
export class ViewInfoComponent implements OnInit, OnDestroy {
  heading = 'My Snippets';
  scope: ScopeModel;

  scopeUpdatedSubscription: Subscription;

  @Select(ScopeState) scope$: Observable<ScopeModel>;

  constructor(
    private store: Store,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.scopeUpdatedSubscription = this.scope$.subscribe((scope: ScopeModel) => {
      this.scope = scope;
      switch (scope.area) {
        case 'user':
          this.heading = 'My Snippets';
          break;
        case 'team':
          const team = scope.value as Team;
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

  editTeam(): void {
    const modalRef = this.modalService.open(TeamModalComponent, { size: 'sm' });
    modalRef.componentInstance.team = this.scope.value;

    modalRef.result.then(
      result => {
        this.store.dispatch(new UpdateTeam(result));
        this.store.dispatch(new UpdateScopeValue(result));
      },
      reason => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.scopeUpdatedSubscription.unsubscribe();
  }
}
