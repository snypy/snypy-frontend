import { Component, OnInit } from '@angular/core';
import { SnippetLoaderService } from '../../services/navigation/snippetLoader.service';

@Component({
  selector: 'app-snippet-order',
  templateUrl: './snippet-order.component.html',
  styleUrls: ['./snippet-order.component.scss']
})
export class SnippetOrderComponent implements OnInit {

  options: {pk: number, name: string, key: string, ordering: -1|1}[] = [
    {pk: 1, name: 'Creation date', key: 'created_date', ordering: -1},
    {pk: 2, name: 'Last modification date', key: 'modified_date', ordering: -1},
    {pk: 3, name: 'Title', key: 'title', ordering: 1}
  ];
  value = 1;

  constructor(private snippetLoaderService: SnippetLoaderService) { }

  ngOnInit() {
    this.snippetLoaderService.updateSnippetOrder(
      this.options[0].key,
      this.options[0].ordering
    );
  }

  valueChange() {
    const option = this.options.find((op) => op.pk === this.value);

    this.snippetLoaderService.updateSnippetOrder(
      option.key,
      option.ordering
    );
  }

}
