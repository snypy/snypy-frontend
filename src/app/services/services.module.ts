import { ModuleWithProviders, NgModule } from '@angular/core';
import { ActiveFilterService } from './navigation/activeFilter.service';
import { AuthResource } from './resources/auth.resource';
import { LabelResource } from './resources/label.resource';
import { SnippetResource } from './resources/snippet.resource';
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
        SnippetResource,
        UserTeamResource,
        ActiveFilterService,
      ],
    };
  }
}
