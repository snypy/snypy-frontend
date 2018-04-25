import { Component, OnInit } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

import { SnippetLoaderService } from '../../services/navigation/snippetLoader.service';
import { Snippet } from '../../services/resources/snippet.resource';
import { FileResource } from '../../services/resources/file.resource';
import { Label } from '../../services/resources/label.resource';
import { AvailableLabelsService } from '../../services/navigation/availableLabels.service';


@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent implements OnInit {

  activeSnippet: ResourceModel<Snippet> = null;
  files: ResourceModel<File>[] = [];
  labels: ResourceModel<Label>[] = [];

  constructor(private snippetLoaderService: SnippetLoaderService,
              private availableLabelsService: AvailableLabelsService,
              private fileResource: FileResource) {
  }

  ngOnInit() {
    this.snippetLoaderService.activeSnippetUpdated.subscribe((snippet) => {
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

    this.labels = this.availableLabelsService.labels;
    this.availableLabelsService.labelsUpdated.subscribe((data) => {
      this.labels = data;
    });
  }

}
