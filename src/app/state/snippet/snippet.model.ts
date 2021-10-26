import { Snippet } from '../../services/resources/snippet.resource';

export interface OrderingModel {
  key: string;
  direction: -1 | 1;
}

export interface SnippetModel {
  activeSnippet: Snippet;
  list: Snippet[];
  filter: Record<string, unknown>;
  searchFilter: string;
  ordering: OrderingModel;
}
