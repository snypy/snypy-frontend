import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SnippetModalComponent } from '../../modals/snippet-modal/snippet-modal.component';
import { SnippetLoaderService } from './../../services/navigation/snippetLoader.service';
import { ActiveScopeService, Scope } from "../../services/navigation/activeScope.service";
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { Team } from "../../services/resources/team.resource";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.scss']
})
export class ViewInfoComponent implements OnInit, OnDestroy {

  heading = "My Snippets";

  scopeUpdatedSubscription: Subscription;

  constructor(private modalService: NgbModal,
              private snippetLoaderService: SnippetLoaderService,
              private activeScopeService: ActiveScopeService) { }

  ngOnInit() {
    this.scopeUpdatedSubscription = this.activeScopeService.scopeUpdated.subscribe((scope: Scope) => {
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
    this.activeScopeService.refreshScope();
  }

  ngOnDestroy() {
    this.scopeUpdatedSubscription.unsubscribe();
  }
}
