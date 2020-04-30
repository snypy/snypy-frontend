import { ModuleWithProviders, NgModule } from '@angular/core';

import { UserResource } from './resources/user.resource';
import { LabelResource } from './resources/label.resource';
import { LanguageResource } from './resources/language.resource';
import { SnippetResource } from './resources/snippet.resource';
import { FileResource } from './resources/file.resource';
import { TeamResource } from './resources/team.resource';

import { ActiveFilterService } from './navigation/activeFilter.service';
import { AuthResource } from './resources/auth.resource';
import { UserTeamResource } from './resources/userteam.resource';
import { SnippetLabelResource } from './resources/snippetlabel.resource';


@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [/* declare in `forRoot()` */],
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
                FileResource,
                TeamResource,
                UserTeamResource,
                SnippetLabelResource,

                ActiveFilterService,
            ]
        };
    }
}
