import { Component, OnInit, TemplateRef, ElementRef, OnDestroy } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SnippetLoaderService } from '../../services/navigation/snippetLoader.service';
import { Snippet } from '../../services/resources/snippet.resource';
import { SnippetModalComponent } from '../snippet-modal/snippet-modal.component';
import { AvailableLabelsService } from '../../services/navigation/availableLabels.service';
import { Label } from '../../services/resources/label.resource';
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-snippet-options',
  templateUrl: './snippet-options.component.html',
  styleUrls: ['./snippet-options.component.scss']
})
export class SnippetOptionsComponent implements OnInit, OnDestroy {

  activeSnippet: ResourceModel<Snippet> = null;
  labels: ResourceModel<Label>[] = [];
  activeLabels: number[] = [];

  availableLabelsSubscription: Subscription;
  snippetLoaderSubscription: Subscription;

  constructor(private snippetLoaderService: SnippetLoaderService,
              private availableLabelsService: AvailableLabelsService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.labels = this.availableLabelsService.labels;

    this.availableLabelsSubscription = this.snippetLoaderService.activeSnippetUpdated.subscribe((snippet) => {
      if (snippet) {
        this.activeSnippet = snippet;
        this.activeLabels = this.activeSnippet.labels;
      }
    });

    this.snippetLoaderSubscription = this.availableLabelsService.labelsUpdated.subscribe((data) => {
      this.labels = data;
    });
  }

  editSnippet() {
    const modalRef = this.modalService.open(SnippetModalComponent, {size: 'lg'});

    modalRef.componentInstance.snippet = this.activeSnippet;

    modalRef.result.then((result) => {
      this.snippetLoaderService.updateActiveSnippet(result);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  deleteSnippet() {
    this.activeSnippet.$remove().$promise
      .then(() => {
        this.snippetLoaderService.deleteSnippet(this.activeSnippet.pk);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openDeleteModal(content: TemplateRef<ElementRef>) {
    this.modalService.open(content).result.then((result) => {
      this.deleteSnippet();
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }

  ngOnDestroy() {
    this.availableLabelsSubscription.unsubscribe();
    this.snippetLoaderSubscription.unsubscribe();
  }
}
