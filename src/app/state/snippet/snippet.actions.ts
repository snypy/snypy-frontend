import { Snippet } from "../../services/resources/snippet.resource";

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
  constructor(public scope: Snippet) {}
}

/**
 * Consider moving these action to filter state
 */
export class UpdateSnippetFilter {
  static readonly type = '[Snippet] Update snippet filter';
  constructor() {}
}

export class UpdateSnippetSearchFilter {
  static readonly type = '[Snippet] Update snippet search filter';
  constructor() {}
}

export class UpdateSnippetOrdering {
  static readonly type = '[Snippet] Update snippet ordering';
  constructor() {}
}
