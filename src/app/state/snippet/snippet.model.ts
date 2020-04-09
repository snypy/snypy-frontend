import { Snippet } from "../../services/resources/snippet.resource";


export interface SnippetModel {
  activeSnippet: Snippet;
  list: Snippet[];
}
