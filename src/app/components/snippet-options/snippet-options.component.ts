import { Component, OnInit } from '@angular/core';

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
      console.log(`Confirm: ${result}`);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

  shareSnippet() {
    alert('ToDo: Share Snippet');
  }

  deleteSnippet() {
    alert('ToDo: Delete Snippet');
  }

}
