import { Component, OnInit } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

import { ActiveSnippetService } from '../../services/navigation/activeSnippet.service';
import { Snippet } from '../../services/resources/snippet.resource';


@Component({
  selector: 'app-snippet-options',
  templateUrl: './snippet-options.component.html',
  styleUrls: ['./snippet-options.component.scss']
})
export class SnippetOptionsComponent implements OnInit {

  activeSnippet: ResourceModel<Snippet> = null;

  constructor(private activeSnippetService: ActiveSnippetService) {
  }

  ngOnInit() {
    this.activeSnippetService.snippetUpdated.subscribe((snippet) => {
      if (snippet) {
        this.activeSnippet = snippet;
      }
    });
  }

  editSnippet() {
    alert('ToDo: Edit Snippet');
  }

  shareSnippet() {
    alert('ToDo: Share Snippet');
  }

  deleteSnippet() {
    alert('ToDo: Delete Snippet');
  }

}
