import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ResourceModel } from "ngx-resource-factory/resource/resource-model";
import { ROLES, UserTeam } from "../../services/resources/userteam.resource";
import { Snippet } from "../../services/resources/snippet.resource";
import { User } from "../../services/resources/user.resource";


export enum PERMISSION {
  'cadAddTeamMember',
  'canEditTeamMember',
  'canDeleteTeamMember',
  'canEditSnippet',
  'canDeleteSnippet',
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
  static cadAddTeamMember(userTeam: ResourceModel<UserTeam>): boolean {
    return userTeam.role == ROLES.EDITOR;
  }

  static canEditTeamMember(userTeam: ResourceModel<UserTeam>): boolean {
    return PermDirective.cadAddTeamMember(userTeam);
  }

  static canDeleteTeamMember(userTeam: ResourceModel<UserTeam>): boolean {
    return PermDirective.cadAddTeamMember(userTeam);
  }

  static canEditSnippet(user: ResourceModel<User>, snippet: ResourceModel<Snippet>) {
    return snippet.user === user.pk;

    // To be implemented in 1.1, userTeam must be loaded from global state
    //
    // if (!snippet.team && snippet.user === user.pk) {
    //   return true;
    // }
    // else if (snippet.team && userTeam.role == ROLES.CONTRIBUTOR) {
    //   return true;
    // }
    // else if (snippet.team && userTeam.role == ROLES.EDITOR) {
    //   return true;
    // }
  }

  static canDeleteSnippet(user: ResourceModel<User>, snippet: ResourceModel<Snippet>) {
    return PermDirective.canEditSnippet(user, snippet);
  }
}
