import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { UpdateLabels } from '../../state/label/label.actions';
import { UpdateLanguages } from '../../state/language/language.actions';
import { SetActiveSnippet } from '../../state/snippet/snippet.actions';
import { SnippetService } from '@snypy/rest-client';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss'],
  standalone: false,
})
export class FullscreenComponent implements OnInit {
  snippetError = false;

  constructor(private route: ActivatedRoute, private snippetService: SnippetService, private store: Store) {}

  ngOnInit(): void {
    const snippetPk = this.route.snapshot.params.id;

    firstValueFrom(this.snippetService.snippetRetrieve({ id: snippetPk }))
      .then(data => {
        this.store.dispatch(new SetActiveSnippet(data));
        this.store.dispatch(new UpdateLabels());
        this.store.dispatch(new UpdateLanguages());
      })
      .catch(() => {
        this.snippetError = true;
      });
  }
}
