import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { ROLES, UserTeam } from "../../services/resources/userteam.resource";


export enum PERMISSION {
  'cadAddTeamMember',
  'canEditTeamMember',
  'canDeleteTeamMember',
}


@Directive({
  selector: '[appPerm]'
})
export class PermDirective {

  permName: PERMISSION;
  permArgs: any[] = [];
  hasPerm: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  @Input() set appPerm(permission: PERMISSION) {
    this.permName = permission;
  }

  @Input() set appPermArgs(args: any[]) {
    this.permArgs = args;
    this.hasPerm = PermDirective.checkPerm(this.permName, this.permArgs);

    if (this.hasPerm) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  @Input() set appPermElse(templateRef: TemplateRef<any>) {
    if (!this.hasPerm) {
      this.viewContainer.createEmbeddedView(templateRef);
    }
  }

  static checkPerm(permName: PERMISSION, args: any[]): boolean {
    return PermDirective[permName](...args);
  }

  /**
   * Permissions
   */
  static cadAddTeamMember(instance: ResourceModel<UserTeam>): boolean {
    return instance.role == ROLES.EDITOR;
  }

  static canEditTeamMember(instance: ResourceModel<UserTeam>): boolean {
    return instance.role == ROLES.EDITOR;
  }

  static canDeleteTeamMember(instance: ResourceModel<UserTeam>): boolean {
    return instance.role == ROLES.EDITOR;
  }

}
