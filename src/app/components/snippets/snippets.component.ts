import { Component, OnDestroy, OnInit } from '@angular/core';

import { SnippetResource, Snippet } from '../../services/resources/snippet.resource';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { SnippetLoaderService } from '../../services/navigation/snippetLoader.service';
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss']
})
export class SnippetsComponent implements OnInit, OnDestroy {

  activeSnippet: Snippet = null;
  snippets: ResourceModel<Snippet>[] = [];

  snippetsLoadedSubscription: Subscription;
  activeSnippetSubscription: Subscription;
  activeSnippetDeletedSubscription: Subscription;

  constructor(private snippetResource: SnippetResource,
              private snippetLoaderService: SnippetLoaderService) { }

  ngOnInit() {
    /**
     * Initial load
     */
    this.snippetsLoadedSubscription = this.snippetLoaderService.snippetsLoaded.subscribe((snippets) => {
      this.snippets = snippets;
    });

    /**
     * Snippet updated subscription
     */
    this.activeSnippetSubscription = this.snippetLoaderService.activeSnippetUpdated.subscribe((snippet) => {
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
    this.activeSnippetDeletedSubscription = this.snippetLoaderService.activeSnippetDeleted.subscribe((snippetPk) => {
      // Remove snippet from list
      if (snippetPk) {
        const oldSnippet = this.snippets.find(item => item.pk === snippetPk);
        if (oldSnippet) {
          this.snippets.splice(this.snippets.indexOf(oldSnippet), 1);
        }
      }

      // Set first snippet in list as active
      if (this.snippets.length) {
        this.snippetLoaderService.updateActiveSnippet(this.snippets[0]);
      }
    });
  }

  loadSnippet(snippet: ResourceModel<Snippet>) {
    this.snippetLoaderService.updateActiveSnippet(snippet);
  }

  ngOnDestroy() {
    this.snippetsLoadedSubscription.unsubscribe();
    this.activeSnippetSubscription.unsubscribe();
    this.activeSnippetDeletedSubscription.unsubscribe();
  }
}
