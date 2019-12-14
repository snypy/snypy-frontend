import {Injectable} from '@angular/core';

import {ResourceModel} from 'ngx-resource-factory/resource/resource-model';

import {Language, LanguageResource} from '../resources/language.resource';
import {Team} from "../resources/team.resource";
import {ActiveScopeService} from "./activeScope.service";
import {Subject} from "rxjs";
import {User} from "../resources/user.resource";


@Injectable()
export class AvailableLanguagesService {

  languages: ResourceModel<Language>[] = [];
  languagesPromise: Promise<ResourceModel<Language>[]> = null;
  languagesUpdated = new Subject<ResourceModel<Language>[]>();

  constructor(private languageResource: LanguageResource,
              private activeScopeService: ActiveScopeService,) {
  }

  refreshLanguages() {
    this.languagesPromise = this.loadLanguages();

    this.languagesPromise
      .then((data) => {
        this.languages = data;
        this.triggerLanguagesUpdated();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadLanguages() {
    let payload = {};
    let scope = this.activeScopeService.getScope();

    /**
     * Scope specific filters
     */
    switch (scope.area) {
      case 'user':
        let user = scope.value as ResourceModel<User>;
        payload['user'] = user.pk;
        break;
      case 'team':
        let team = scope.value as ResourceModel<Team>;
        payload['team'] = team.pk;
        break;
    }

    return this.languageResource.query({
      ...payload,
    }).$promise;
  }

  private triggerLanguagesUpdated() {
    this.languagesUpdated.next(this.languages);
  }
}
