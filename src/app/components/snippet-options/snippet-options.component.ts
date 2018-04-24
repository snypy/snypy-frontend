import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActiveSnippetService } from '../../services/navigation/activeSnippet.service';
import { Snippet } from '../../services/resources/snippet.resource';
import { SnippetModalComponent } from '../snippet-modal/snippet-modal.component';


@Component({
  selector: 'app-snippet-options',
  templateUrl: './snippet-options.component.html',
  styleUrls: ['./snippet-options.component.scss']
})
export class SnippetOptionsComponent implements OnInit {

  activeSnippet: ResourceModel<Snippet> = null;

  constructor(private activeSnippetService: ActiveSnippetService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.activeSnippetService.snippetUpdated.subscribe((snippet) => {
      if (snippet) {
        this.activeSnippet = snippet;
      }
    });
  }

  editSnippet() {
    const modalRef = this.modalService.open(SnippetModalComponent, {size: 'lg'});

    modalRef.componentInstance.snippet = this.activeSnippet;

    modalRef.result.then((result) => {
      this.activeSnippetService.updateSnippet(result);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  shareSnippet() {
    alert('ToDo: Share Snippet');
  }

  deleteSnippet() {
    this.activeSnippet.$remove().$promise
      .then(() => {
        this.activeSnippetService.deleteSnippet(this.activeSnippet.pk);
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

}
