import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select } from '@ngxs/store';
import { FileService } from '@snypy/rest-client';
import { Observable } from 'rxjs';
import { Label } from '@snypy/rest-client';
import { Language, Snippet } from '@snypy/rest-client';
import { LabelState } from '../../state/label/label.state';
import { LanguageState } from '../../state/language/language.state';

@UntilDestroy()
@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SnippetComponent implements OnInit {
  public copiedFile: File | null = null;
  public timer = null;

  public files$: Observable<File[]> = null;

  @Select(LabelState) public labels$: Observable<Label[]>;
  @Select(state => state.snippet.activeSnippet) public activeSnippet$: Observable<Snippet>;

  @SelectSnapshot(LanguageState)
  public languages: Language[];

  public constructor(private fileService: FileService) {}

  public ngOnInit(): void {
    this.activeSnippet$.pipe(untilDestroyed(this)).subscribe(activeSnippet => {
      if (activeSnippet) {
        this.files$ = this.fileService.fileList({ snippet: activeSnippet.pk });
      }
    });
  }

  public getLanguageName(langugaeId: number): string {
    const language = this.languages.find(language => language.pk === langugaeId);
    if (language) {
      return language.name;
    }
    return 'default';
  }

  public fileCopied(file: File): void {
    this.copiedFile = file;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.copiedFile = null;
    }, 2500);
  }

  public calculateEditorHeight(content: string): string {
    const newLinesCount = content.split('\n').length;
    return `${newLinesCount * 20}px`;
  }
}
