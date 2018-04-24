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
    /**
     * Initial load
     */
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

    /**
     * Snippet updated subscription
     */
    this.activeSnippetService.snippetUpdated.subscribe((snippet) => {
      this.activeSnippet = snippet;

      // Update snippet in list
      if (snippet) {
        const oldSnippet = this.snippets.find(item => item.pk === snippet.pk);
        if (oldSnippet) {
          this.snippets.splice(this.snippets.indexOf(oldSnippet), 1, snippet);
        }
      }
    });

    /**
     * Snippet deleted subscription
     */
    this.activeSnippetService.snippetDeleted.subscribe((snippetPk) => {
      // Remove snippet from list
      if (snippetPk) {
        const oldSnippet = this.snippets.find(item => item.pk === snippetPk);
        if (oldSnippet) {
          this.snippets.splice(this.snippets.indexOf(oldSnippet), 1);
        }
      }

      // Set first snippet in list as active
      if (this.snippets.length) {
        this.activeSnippetService.updateSnippet(this.snippets[0]);
      }
    });
  }

  loadSnippet(snippet: ResourceModel<Snippet>) {
    this.activeSnippetService.updateSnippet(snippet);
  }

}
