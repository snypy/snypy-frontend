import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss']
})
export class HelpModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeAction(reason: string) {
    this.activeModal.dismiss(reason);
  }

}
