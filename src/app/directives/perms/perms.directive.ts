import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { ROLES, UserTeam } from "../../services/resources/userteam.resource";

@Directive({
  selector: '[appPerms]'
})
export class PermsDirective {

  hasPerm: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  @Input() set appPerms(conditions: any) {
    for (const condition of conditions) {
      this.hasPerm = this[condition['perm']](...condition['args']);

      if (!this.hasPerm) {
        break;
      }
    }

    if (this.hasPerm) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  @Input() set appPermsElse(templateRef: TemplateRef<any>) {
    if (!this.hasPerm) {
      this.viewContainer.createEmbeddedView(templateRef);
    }
  }

  private canEditTeamMember(instance: ResourceModel<UserTeam>) {
    return instance.role == ROLES.EDITOR;
  }

  private canDeleteTeamMember(instance: ResourceModel<UserTeam>) {
    return instance.role == ROLES.EDITOR;
  }

}
