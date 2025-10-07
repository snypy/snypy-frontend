import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserTeam, UserteamService } from '@snypy/rest-client';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-team-member-delete-modal',
  templateUrl: './team-member-delete-modal.component.html',
  styleUrls: ['./team-member-delete-modal.component.scss'],
  standalone: false,
})
export class TeamMemberDeleteModalComponent {
  @Input() userTeam: UserTeam = null;

  constructor(private activeModal: NgbActiveModal, private toastr: ToastrService, private userteamService: UserteamService) {}

  confirmAction(): void {
    firstValueFrom(this.userteamService.userteamDestroy({ id: this.userTeam.pk }))
      .then(() => {
        this.toastr.success('Team deleted!');
        this.activeModal.close();
      })
      .catch(error => {
        console.log(error);
        this.toastr.error('Cannot delete team!');
      });
  }

  closeAction(reason: string): void {
    this.activeModal.dismiss(reason);
  }
}
