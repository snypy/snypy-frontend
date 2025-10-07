import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent } from '@ng-select/ng-select';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Label, LabelService, Language, Snippet, SnippetService, VisibilityEnum } from '@snypy/rest-client';
import { ToastrService } from 'ngx-toastr';
import { Observable, firstValueFrom } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { mapFormErrors } from '../../helpers/form-error-mapper';
import { AddLabel, UpdateLabels } from '../../state/label/label.actions';
import { LabelState } from '../../state/label/label.state';
import { UpdateLanguages } from '../../state/language/language.actions';
import { LanguageState } from '../../state/language/language.state';
import { ScopeModel } from '../../state/scope/scope.model';
import { ScopeState } from '../../state/scope/scope.state';
import { SetActiveSnippet } from '../../state/snippet/snippet.actions';
import { SnippetState } from '../../state/snippet/snippet.state';
import { FormlyFieldConfig } from '@ngx-formly/core';

@UntilDestroy()
@Component({
  selector: 'app-snippet-modal',
  templateUrl: './snippet-modal.component.html',
  styleUrls: ['./snippet-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SnippetModalComponent implements OnInit {
  @ViewChild('labelselect')
  public labelSelectComponent: NgSelectComponent;

  @Input() public snippet: Snippet = null;

  @SelectSnapshot(ScopeState)
  public scope: ScopeModel;

  @SelectSnapshot(LanguageState)
  public languages: Language[];

  @SelectSnapshot(LabelState)
  public labels: Label[];

  @Select(LabelState) public readonly labels$!: Observable<Label[]>;

  @Select(LanguageState) public readonly languages$!: Observable<Language[]>;

  @Select(SnippetState.getFilter) private readonly filter$!: Observable<Record<string, unknown>>;

  form: FormGroup = new FormGroup([]);
  filesForm = new FormArray([]);
  model = {
    title: null,
    description: '',
    visibility: VisibilityEnum.Private,
    labels: [],
    files: [],
    team: null,
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: 'Title',
        placeholder: 'Enter title',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'textarea',
      props: {
        label: 'Description',
        placeholder: 'Enter description',
        required: true,
        rows: 5,
        autosize: true,
      },
    },
    {
      key: 'labels',
      type: 'select',
      props: {
        type: 'text',
        label: 'Labels',
        placeholder: 'Enter labels',
        options: this.labels$,
        valueProp: 'pk',
        labelProp: 'name',
        multiple: true,
      },
    },
    {
      key: 'visibility',
      type: 'select',
      props: {
        label: 'Visibility',
        options: [
          {
            value: 'PRIVATE',
            label: 'Private',
          },
          {
            value: 'PUBLIC',
            label: 'Public',
          },
        ],
      },
    },
  ];

  private readonly activeLabel$ = this.filter$.pipe(
    filter(Boolean),
    map(filter => filter.labels)
  );

  public constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly snippetService: SnippetService,
    private readonly labelService: LabelService,
    private readonly toastr: ToastrService,
    private readonly store: Store
  ) {}

  public ngOnInit(): void {
    /**
     * Set snippet values from given snippet
     */
    if (this.snippet) {
      this.model = {
        title: this.snippet.title,
        description: this.snippet.description,
        visibility: this.snippet.visibility,
        labels: this.snippet.labels,
        team: this.snippet.team,
        files: this.snippet.files,
      };
    }

    /**
     * Snippet files
     */
    if (this.snippet) {
      for (const snippetFile of this.snippet.files) {
        this.filesForm.push(
          new FormGroup({
            pk: new FormControl(snippetFile.pk),
            name: new FormControl(snippetFile.name),
            language: new FormControl(snippetFile.language),
            content: new FormControl(snippetFile.content),
          })
        );
      }
    }
  }

  public removeFile(index: number): void {
    this.filesForm.removeAt(index);
  }

  public addFile(): void {
    this.filesForm.push(
      new FormGroup({
        name: new FormControl(null),
        language: new FormControl(null),
        content: new FormControl(null),
      })
    );
  }

  public confirmAction(closeModal: boolean): void {
    let promise, message, errorMessage;

    this.model.files = this.filesForm.value;

    if (this.snippet) {
      promise = firstValueFrom(
        this.snippetService.snippetUpdate({
          id: this.snippet.pk,
          snippetRequest: this.model,
        })
      );
      message = 'Snippet updated!';
      errorMessage = 'Cannot update snippet!';
    } else {
      promise = firstValueFrom(this.snippetService.snippetCreate({ snippetRequest: this.model }));
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
        mapFormErrors(this.form, error.error);
      });
  }

  public closeAction(reason: string): void {
    this.activeModal.dismiss(reason);
  }

  protected createNewLabel = (label: string) => {
    firstValueFrom(this.labelService.labelCreate({ labelRequest: { name: label } })).then(response => {
      this.store.dispatch(new AddLabel(response));
      // this.snippetForm.get('snippetRequest.labels').setValue([...this.snippetForm.get('snippetRequest.labels').value, response.pk]);
      this.labelSelectComponent.searchTerm = null;
      this.toastr.success('Label added!');
    });
  };
}
