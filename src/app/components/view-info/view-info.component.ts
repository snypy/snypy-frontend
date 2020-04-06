import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SnippetModalComponent } from '../../modals/snippet-modal/snippet-modal.component';
import { SnippetLoaderService } from '../../services/navigation/snippetLoader.service';
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { Team } from "../../services/resources/team.resource";
import { Observable, Subscription } from "rxjs";
import { RefreshScope } from "../../state/scope/scope.actions";
import { Select, Store } from "@ngxs/store";
import { ScopeState } from "../../state/scope/scope.state";
import { ScopeModel } from "../../state/scope/scope.model";


@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.scss']
})
export class ViewInfoComponent implements OnInit, OnDestroy {

  heading = "My Snippets";

  scopeUpdatedSubscription: Subscription;

  @Select(ScopeState) scope$: Observable<ScopeModel>;

  constructor(private store: Store,
              private modalService: NgbModal,
              private snippetLoaderService: SnippetLoaderService) {
  }

  ngOnInit() {
    this.scopeUpdatedSubscription = this.scope$.subscribe((scope: ScopeModel) => {
      switch (scope.area) {
        case 'user':
          this.heading = "My Snippets";
          break;
        case 'team':
          let team = scope.value as ResourceModel<Team>;
          this.heading = team.name;
          break;
        case 'global':
          this.heading = "Global";
          break;
      }
    })
  }

  addSnippet() {
    const modalRef = this.modalService.open(SnippetModalComponent, {size: 'lg'});

    modalRef.result.then((result) => {
      this.snippetLoaderService.addNewSnippet(result);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  triggerReload() {
    this.store.dispatch(new RefreshScope());
  }

  ngOnDestroy() {
    this.scopeUpdatedSubscription.unsubscribe();
  }
}
