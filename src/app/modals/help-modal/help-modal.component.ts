import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss'],
  standalone: false,
})
export class HelpModalComponent {
  constructor(private activeModal: NgbActiveModal) {}

  closeAction(reason: string): void {
    this.activeModal.dismiss(reason);
  }
}
