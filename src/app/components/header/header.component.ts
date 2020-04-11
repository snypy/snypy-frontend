import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthResource } from "../../services/resources/auth.resource";
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { User } from "../../services/resources/user.resource";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HelpModalComponent } from "../../modals/help-modal/help-modal.component";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { SnippetLoaderService } from "../../services/navigation/snippetLoader.service";
import { debounceTime } from "rxjs/operators";
import { Store } from "@ngxs/store";
import { UpdateSnippetSearchFilter } from "../../state/snippet/snippet.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser: ResourceModel<User>;

  snippetSearchForm: FormGroup;
  snippetSearchFormSubscription: Subscription;

  constructor(private store: Store,
              private authResource: AuthResource,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.currentUser = this.authResource.currentUser;

    this.snippetSearchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.snippetSearchFormSubscription = this.snippetSearchForm.get('search').valueChanges.pipe(
      debounceTime(500)
    ).subscribe((value) => {
      this.store.dispatch(new UpdateSnippetSearchFilter(value));
    });
  }

  openHelp() {
    this.modalService.open(HelpModalComponent, {size: 'sm'});
  }

  doLogout() {
    this.authResource.logout();
  }

  ngOnDestroy() {
    this.snippetSearchFormSubscription.unsubscribe();
  }
}
