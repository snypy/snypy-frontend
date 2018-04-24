import { Injectable } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

import { Language, LanguageResource } from '../resources/language.resource';


@Injectable()
export class AvailableLanguagesService {

    languages: ResourceModel<Language>[] = [];
    languagesPromise: Promise<ResourceModel<Language>[]> = null;

    constructor(private languageResource: LanguageResource) {
        this.languagesPromise = this.languageResource.query({}).$promise;

        this.languagesPromise
            .then((data) => {
                this.languages = data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

}
