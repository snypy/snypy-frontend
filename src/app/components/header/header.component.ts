import { Component, OnInit } from '@angular/core';
import { AuthResource } from "../../services/resources/auth.resource";
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { User } from "../../services/resources/user.resource";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HelpModalComponent } from "../help-modal/help-modal.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: ResourceModel<User>;

  constructor(private authResource: AuthResource,
              private modalService: NgbModal,) {
  }

  ngOnInit() {
    this.currentUser = this.authResource.currentUser;
  }

  openHelp() {
    this.modalService.open(HelpModalComponent, {size: 'sm'});
  }

  doLogout() {
    this.authResource.logout();
  }
}
