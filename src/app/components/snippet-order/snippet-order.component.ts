import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UpdateSnippetOrderingFilter } from '../../state/snippet/snippet.actions';

@Component({
  selector: 'app-snippet-order',
  templateUrl: './snippet-order.component.html',
  styleUrls: ['./snippet-order.component.scss'],
  standalone: false,
})
export class SnippetOrderComponent implements OnInit {
  options: { pk: number; name: string; key: string; ordering: -1 | 1 }[] = [
    { pk: 1, name: 'Creation date', key: 'created_date', ordering: -1 },
    { pk: 2, name: 'Last modification date', key: 'modified_date', ordering: -1 },
    { pk: 3, name: 'Title', key: 'title', ordering: 1 },
  ];
  value = 1;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      new UpdateSnippetOrderingFilter({
        key: this.options[0].key,
        direction: this.options[0].ordering,
      })
    );
  }

  valueChange(): void {
    const option = this.options.find(op => op.pk === this.value);

    this.store.dispatch(
      new UpdateSnippetOrderingFilter({
        key: option.key,
        direction: option.ordering,
      })
    );
  }
}
