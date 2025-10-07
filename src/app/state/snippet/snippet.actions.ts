import { Snippet } from '@snypy/rest-client';
import { OrderingModel } from './snippet.model';

export class UpdateSnippets {
  static readonly type = '[Snippet] Update snippets';
}

export class SetActiveSnippet {
  static readonly type = '[Snippet] Set active snippet';
  constructor(public snippet: Snippet) {}
}

export class AddSnippet {
  static readonly type = '[Snippet] Add snippet';
  constructor(public snippet: Snippet) {}
}

export class RemoveSnippet {
  static readonly type = '[Snippet] Remove snippet';
  constructor(public snippet: Snippet) {}
}

/**
 * Consider moving these action to filter state
 */
export class UpdateSnippetFilter {
  static readonly type = '[Snippet] Update snippet filter';
  constructor(
    public filter: Record<string, unknown>,
    public reload = true
  ) {}
}

export class UpdateSnippetSearchFilter {
  static readonly type = '[Snippet] Update snippet search filter';
  constructor(public filter: string) {}
}

export class UpdateSnippetOrderingFilter {
  static readonly type = '[Snippet] Update snippet ordering filter';
  constructor(public ordering: OrderingModel) {}
}
