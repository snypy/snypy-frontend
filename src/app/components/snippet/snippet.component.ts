import { Component, OnInit } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

import { ActiveSnippetService } from '../../services/navigation/activeSnippet.service';
import { Snippet } from '../../services/resources/snippet.resource';
import { FileResource } from '../../services/resources/file.resource';


@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent implements OnInit {

  activeSnippet: ResourceModel<Snippet> = null;
  files: ResourceModel<File>[] = [];

  constructor(private activeSnippetService: ActiveSnippetService,
              private fileResource: FileResource) {
  }

  ngOnInit() {
    this.activeSnippetService.snippetUpdated.subscribe((snippet) => {
      if (snippet) {
        this.activeSnippet = snippet;

        this.fileResource.query({snippet: snippet.pk}).$promise
          .then((data) => {
            this.files = data;
          })
          .catch((error) => {
            console.log(error);
          });
        }
    });
  }

}
