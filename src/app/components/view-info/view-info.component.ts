import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SnippetModalComponent } from './../../components/snippet-modal/snippet-modal.component';
import { SnippetLoaderService } from './../../services/navigation/snippetLoader.service';


@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.scss']
})
export class ViewInfoComponent implements OnInit {

  constructor(private modalService: NgbModal,
              private snippetLoaderService: SnippetLoaderService) { }

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
