import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select } from '@ngxs/store';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Observable, Subscription } from 'rxjs';
import { FileResource } from '../../services/resources/file.resource';
import { Label } from '../../services/resources/label.resource';
import { Language } from '../../services/resources/language.resource';
import { Snippet } from '../../services/resources/snippet.resource';
import { LabelState } from '../../state/label/label.state';
import { LanguageState } from '../../state/language/language.state';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss'],
})
export class SnippetComponent implements OnInit, OnDestroy {
  activeSnippet: Snippet = null;
  files: ResourceModel<File>[] = [];
  labels: Label[] = [];
  copiedFile: File | null = null;
  timer = null;

  availableLabelsSubscription: Subscription;
  snippetLoaderSubscription: Subscription;

  @Select(LabelState) labels$: Observable<Label[]>;
  @Select(state => state.snippet.activeSnippet) activeSnippet$: Observable<Snippet>;

  @SelectSnapshot(LanguageState)
  public languages: Language[];

  constructor(private fileResource: FileResource) {}

  ngOnInit(): void {
    this.availableLabelsSubscription = this.activeSnippet$.subscribe(snippet => {
      if (snippet) {
        this.activeSnippet = snippet;

        this.fileResource
          .query({ snippet: snippet.pk })
          .$promise.then(data => {
            this.files = data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    });

    this.snippetLoaderSubscription = this.labels$.subscribe(data => {
      this.labels = data;
    });
  }

  ngOnDestroy(): void {
    this.availableLabelsSubscription.unsubscribe();
    this.snippetLoaderSubscription.unsubscribe();
  }

  getLanguageName(langugaeId: number): string {
    const language = this.languages.find(language => language.pk === langugaeId);
    if (language) {
      return language.name;
    }
    return 'default';
  }

  fileCopied(file: File) {
    this.copiedFile = file;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.copiedFile = null;
    }, 2500);
  }
}
