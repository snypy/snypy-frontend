import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Snippet } from '@snypy/rest-client';
import { SetActiveSnippet } from '../../state/snippet/snippet.actions';

@UntilDestroy()
@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss'],
  standalone: false,
})
export class SnippetsComponent implements OnInit, OnDestroy {
  activeSnippet: Snippet = null;
  snippets: Snippet[] = [];

  snippetsLoadedSubscription: Subscription;
  activeSnippetSubscription: Subscription;

  @Select(state => state.snippet.activeSnippet) activeSnippet$: Observable<Snippet>;
  @Select(state => state.snippet.list) snippetList$: Observable<Snippet[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    /**
     * Initial load
     */
    this.snippetsLoadedSubscription = this.snippetList$.pipe(untilDestroyed(this)).subscribe(snippets => {
      this.snippets = snippets;
    });

    /**
     * Snippet updated subscription
     */
    this.activeSnippetSubscription = this.activeSnippet$.pipe(untilDestroyed(this), filter(Boolean)).subscribe(snippet => {
      this.activeSnippet = snippet;

      // Update snippet in list
      if (snippet) {
        const oldSnippet = this.snippets.find(item => item.pk === snippet.pk);
        if (oldSnippet) {
          this.snippets.splice(this.snippets.indexOf(oldSnippet), 1, snippet);
        }
      }
    });
  }

  loadSnippet(snippet: Snippet): void {
    this.store.dispatch(new SetActiveSnippet(snippet));
  }

  ngOnDestroy(): void {
    this.snippetsLoadedSubscription.unsubscribe();
    this.activeSnippetSubscription.unsubscribe();
  }
}
