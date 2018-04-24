import { ModuleWithProviders, NgModule } from '@angular/core';

import { UserResource } from './resources/user.resource';
import { LabelResource } from './resources/label.resource';
import { LanguageResource } from './resources/language.resource';
import { SnippetResource } from './resources/snippet.resource';
import { FileResource } from './resources/file.resource';

import { ActiveFilterService } from './navigation/activeFilter.service';
import { ActiveSnippetService } from './navigation/activeSnippet.service';
import { AvailableLanguagesService } from './navigation/availableLanguages.service';


@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [/* declare in `forRoot()` */],
})
export class ServicesModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServicesModule,
            providers: [
                UserResource,
                LabelResource,
                LanguageResource,
                SnippetResource,
                FileResource,
                ActiveFilterService,
                ActiveSnippetService,
                AvailableLanguagesService,
            ]
        };
    }
}
