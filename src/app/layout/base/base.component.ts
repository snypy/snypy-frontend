import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveFilterService } from "../../services/navigation/activeFilter.service";
import { ActiveScopeService, Scope } from "../../services/navigation/activeScope.service";
import { AvailableLabelsService } from "../../services/navigation/availableLabels.service";
import { SnippetLoaderService } from "../../services/navigation/snippetLoader.service";
import { Subscription } from "rxjs/Subscription";
import {AvailableLanguagesService} from "../../services/navigation/availableLanguages.service";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit, OnDestroy {

  activeScopeSubscription: Subscription;

  constructor(private activeScopeService: ActiveScopeService,
              private activeFilterService: ActiveFilterService,
              private availableLabelsService: AvailableLabelsService,
              private availableLanguagesService: AvailableLanguagesService,
              private snippetLoaderService: SnippetLoaderService,) {
  }

  ngOnInit() {
    /**
     * Refresh snippets on scope changes
     */
    this.activeScopeSubscription = this.activeScopeService.scopeUpdated.subscribe((scope: Scope) => {
      if (scope.area) {
        this.snippetLoaderService.activeSnippet = null;
        this.availableLabelsService.refreshLabels();
        this.availableLanguagesService.refreshLanguages();
        this.activeFilterService.updateFilter('main', 'all');
      }
    });

    this.activeScopeService.refreshScope();
  }

  ngOnDestroy() {
    this.activeScopeSubscription.unsubscribe();
  }

}
