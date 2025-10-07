import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HelpModalComponent } from '../../modals/help-modal/help-modal.component';
import { AuthResource } from '../../services/resources/auth.resource';
import { User } from '@snypy/rest-client';
import { UpdateSnippetSearchFilter } from '../../state/snippet/snippet.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;

  snippetSearchForm: FormGroup;
  snippetSearchFormSubscription: Subscription;

  constructor(
    private store: Store,
    private authResource: AuthResource,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authResource.currentUser;

    this.snippetSearchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.snippetSearchFormSubscription = this.snippetSearchForm
      .get('search')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(value => {
        this.store.dispatch(new UpdateSnippetSearchFilter(value));
      });
  }

  openHelp(): void {
    this.modalService.open(HelpModalComponent, { size: 'sm' });
  }

  doLogout(): void {
    this.authResource.logout();
  }

  ngOnDestroy(): void {
    this.snippetSearchFormSubscription.unsubscribe();
  }
}
