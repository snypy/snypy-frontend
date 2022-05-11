import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { SnippetResource } from '../../services/resources/snippet.resource';
import { UpdateLabels } from '../../state/label/label.actions';
import { UpdateLanguages } from '../../state/language/language.actions';
import { SetActiveSnippet } from '../../state/snippet/snippet.actions';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss'],
})
export class FullscreenComponent implements OnInit {
  snippetError = false;

  constructor(private route: ActivatedRoute, private snippetResource: SnippetResource, private store: Store) {}

  ngOnInit(): void {
    const snippetPk = this.route.snapshot.params.id;

    this.snippetResource
      .get({ pk: snippetPk })
      .$promise.then(data => {
        this.store.dispatch(new SetActiveSnippet(data));
        this.store.dispatch(new UpdateLabels());
        this.store.dispatch(new UpdateLanguages());
      })
      .catch(() => {
        this.snippetError = true;
      });
  }
}
