import { Component, OnInit } from '@angular/core';


import { UserResource, User } from './services/resources/user.resource';
import { SnippetModalComponent } from './components/snippet-modal/snippet-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnippetLoaderService } from './services/navigation/snippetLoader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  currentUser = 1;

  constructor(private modalService: NgbModal,
              private snippetLoaderService: SnippetLoaderService) {
  }

  ngOnInit() {
  }

  addSnippet() {
    const modalRef = this.modalService.open(SnippetModalComponent, {size: 'lg'});

    modalRef.result.then((result) => {
      this.snippetLoaderService.addNewSnippet(result);
    }, (reason) => {
      console.log(`Dismissed: ${reason}`);
    });
  }

}
