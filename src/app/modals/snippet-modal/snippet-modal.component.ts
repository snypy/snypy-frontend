import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Team } from '@snypy/rest-client';
import { mapFormErrors } from 'ngx-anx-forms';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Label } from '@snypy/rest-client';
import { Language, Snippet, SnippetService } from '@snypy/rest-client';
import { UpdateLabels } from '../../state/label/label.actions';
import { LabelState } from '../../state/label/label.state';
import { UpdateLanguages } from '../../state/language/language.actions';
import { LanguageState } from '../../state/language/language.state';
import { ScopeModel } from '../../state/scope/scope.model';
import { ScopeState } from '../../state/scope/scope.state';
import { SetActiveSnippet } from '../../state/snippet/snippet.actions';
import { SnippetState } from '../../state/snippet/snippet.state';

@UntilDestroy()
@Component({
  selector: 'app-snippet-modal',
  templateUrl: './snippet-modal.component.html',
  styleUrls: ['./snippet-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetModalComponent implements OnInit {
  @Input() public snippet: Snippet = null;

  public snippetForm: FormGroup;

  @SelectSnapshot(ScopeState)
  public scope: ScopeModel;

  @SelectSnapshot(LanguageState)
  public languages: Language[];

  @SelectSnapshot(LabelState)
  public labels: Label[];

  @Select(SnippetState.getFilter) private readonly filter$!: Observable<Record<string, unknown>>;

  private readonly activeLabel$ = this.filter$.pipe(
    filter(Boolean),
    map(filter => filter.labels)
  );

  public visibilities = [
    {
      key: 'PRIVATE',
      name: 'Private',
    },
    {
      key: 'PUBLIC',
      name: 'Public',
    },
  ];

  public constructor(
    private activeModal: NgbActiveModal,
    private snippetService: SnippetService,
    private toastr: ToastrService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    /**
     * Setup snippet from
     *
     * @type {FormGroup}
     */
    this.snippetForm = new FormGroup({
      id: new FormControl(null),
      snippetRequest: new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        labels: new FormControl([]),
        visibility: new FormControl('PRIVATE'),
        team: new FormControl(null),
      }),
    });

    /**
     * Set team value from scope
     */
    if (this.scope.area == 'team') {
      const team = this.scope.value as Team;
      this.snippetForm.get('snippetRequest.team').setValue(team.pk);
    }

    /**
     * Set snippet values from given snippet
     */
    if (this.snippet) {
      this.snippetForm.get('id').setValue(this.snippet.pk);
      this.snippetForm.get('snippetRequest.title').setValue(this.snippet.title);
      this.snippetForm.get('snippetRequest.description').setValue(this.snippet.description);
      this.snippetForm.get('snippetRequest.labels').setValue(this.snippet.labels);
      this.snippetForm.get('snippetRequest.visibility').setValue(this.snippet.visibility);
      this.snippetForm.get('snippetRequest.team').setValue(this.snippet.team);
    }

    /**
     * Snippet files
     */
    const files = new FormArray([]);
    if (this.snippet) {
      for (const snippetFile of this.snippet.files) {
        files.push(
          new FormGroup({
            pk: new FormControl(snippetFile.pk),
            name: new FormControl(snippetFile.name),
            language: new FormControl(snippetFile.language),
            content: new FormControl(snippetFile.content),
          })
        );
      }
    }
    (this.snippetForm.controls.snippetRequest as FormGroup).addControl('files', files);

    this.activeLabel$.pipe(untilDestroyed(this), take(1), filter(Boolean)).subscribe(label => {
      this.snippetForm.get('labels').setValue([label]);
    });
  }

  public removeFile(index: number): void {
    (<FormArray>this.snippetForm.get('snippetRequest.files')).removeAt(index);
  }

  public addFile(): void {
    (<FormArray>this.snippetForm.get('snippetRequest.files')).push(
      new FormGroup({
        name: new FormControl(null),
        language: new FormControl(null),
        content: new FormControl(null),
      })
    );
  }

  public confirmAction(closeModal: boolean): void {
    let promise, message, errorMessage;

    if (this.snippet) {
      promise = firstValueFrom(this.snippetService.snippetUpdate(this.snippetForm.value));
      message = 'Snippet updated!';
      errorMessage = 'Cannot update snippet!';
    } else {
      promise = firstValueFrom(this.snippetService.snippetCreate(this.snippetForm.value));
      message = 'Snippet added!';
      errorMessage = 'Cannot add snippet!';
    }

    promise
      .then(data => {
        this.store.dispatch(new UpdateLabels());
        this.store.dispatch(new UpdateLanguages());
        this.store.dispatch(new SetActiveSnippet(data));

        this.toastr.success(message);
        if (closeModal) this.activeModal.close(data);
      })
      .catch(error => {
        console.log(error);
        this.toastr.error(errorMessage);
        mapFormErrors(this.snippetForm, error.error);
      });
  }

  public closeAction(reason: string): void {
    this.activeModal.dismiss(reason);
  }
}
