import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthResource} from "../../services/resources/auth.resource";
import {ResourceModel} from "ngx-resource-factory/resource/resource-model";
import {User} from "../../services/resources/user.resource";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HelpModalComponent} from "../help-modal/help-modal.component";
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {SnippetLoaderService} from "../../services/navigation/snippetLoader.service";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser: ResourceModel<User>;

  snippetSearchForm: FormGroup;
  snippetSearchFormSubscription: Subscription;

  constructor(private authResource: AuthResource,
              private modalService: NgbModal,
              private snippetLoaderService: SnippetLoaderService) {
  }

  ngOnInit() {
    this.currentUser = this.authResource.currentUser;

    this.snippetSearchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.snippetSearchFormSubscription = this.snippetSearchForm.get('search').valueChanges.pipe(
      debounceTime(500)
    ).subscribe((value) => {
      this.snippetLoaderService.updateSnippetSearchFilter(value);
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
