import { Component, OnInit } from '@angular/core';

import { SnippetResource, Snippet } from '../../services/resources/snippet.resource';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';


@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss']
})
export class SnippetsComponent implements OnInit {

  currentUser = 1;
  snippets: ResourceModel<Snippet>[] = [];

  constructor(private snippetResource: SnippetResource) { }

  ngOnInit() {
    this.snippetResource.query({user: this.currentUser}).$promise
      .then((data) => {
        this.snippets = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadSnippet(snippet: ResourceModel<Snippet>) {
    alert('Snippet: ' + snippet.pk);
    // ToDo: Pass this value using a service
  }

}
