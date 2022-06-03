import { ModuleWithProviders, NgModule } from '@angular/core';
import { ActiveFilterService } from './navigation/activeFilter.service';
import { AuthResource } from './resources/auth.resource';
import { LabelResource } from './resources/label.resource';
import { LanguageResource } from './resources/language.resource';
import { SnippetResource } from './resources/snippet.resource';
import { SnippetLabelResource } from './resources/snippetlabel.resource';
import { UserResource } from './resources/user.resource';
import { UserTeamResource } from './resources/userteam.resource';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    /* declare in `forRoot()` */
  ],
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [
        AuthResource,
        UserResource,
        LabelResource,
        LanguageResource,
        SnippetResource,
        UserTeamResource,
        SnippetLabelResource,
        ActiveFilterService,
      ],
    };
  }
}
