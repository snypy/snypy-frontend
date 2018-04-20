import { Component, OnInit } from '@angular/core';

import { SnippetResource, Snippet } from '../../services/resources/snippet.resource';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { ActiveSnippetService } from '../../services/navigation/activeSnippet.service';


@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss']
})
export class SnippetsComponent implements OnInit {

  currentUser = 1;
  activeSnippet: Snippet = null;
  snippets: ResourceModel<Snippet>[] = [];

  constructor(private snippetResource: SnippetResource,
              private activeSnippetService: ActiveSnippetService) { }

  ngOnInit() {
    this.snippetResource.query({user: this.currentUser}).$promise
      .then((data) => {
        this.snippets = data;
        if (this.activeSnippetService.activeSnippet === null && data.length) {
          this.activeSnippetService.updateSnippet(data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    this.activeSnippetService.snippetUpdated.subscribe((snippet) => {
      this.activeSnippet = snippet;
    });
  }

  loadSnippet(snippet: ResourceModel<Snippet>) {
    this.activeSnippetService.updateSnippet(snippet);
  }

}
