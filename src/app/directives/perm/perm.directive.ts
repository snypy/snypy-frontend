import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';
import { Snippet } from '../../services/resources/snippet.resource';
import { User } from '../../services/resources/user.resource';
import { ROLES, UserTeam } from '../../services/resources/userteam.resource';

export enum PERMISSION {
  'cadAddTeamMember',
  'canEditTeamMember',
  'canDeleteTeamMember',
  'canEditSnippet',
  'canDeleteSnippet',
}

@Directive({
  selector: '[appPerm]',
})
export class PermDirective implements OnChanges {
  permName: PERMISSION;
  permArgs: any[] = [];
  hasPerm: boolean;

  static checkPerm(permName: PERMISSION, args: any[]): boolean {
    return PermDirective[permName](...args);
  }

  /**
   * Permissions
   */
  static cadAddTeamMember(userTeam: ResourceModel<UserTeam>): boolean {
    return userTeam && userTeam.role === ROLES.EDITOR;
  }

  static canEditTeamMember(userTeam: ResourceModel<UserTeam>): boolean {
    return PermDirective.cadAddTeamMember(userTeam);
  }

  static canDeleteTeamMember(userTeam: ResourceModel<UserTeam>): boolean {
    return PermDirective.cadAddTeamMember(userTeam);
  }

  static canEditSnippet(user: ResourceModel<User>, snippet: ResourceModel<Snippet>): boolean {
    return snippet.editable;
  }

  static canDeleteSnippet(user: ResourceModel<User>, snippet: ResourceModel<Snippet>): boolean {
    return snippet.deletable;
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

  ngOnChanges(): void {
    this.viewContainer.clear();

    if (this.hasPerm) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  @Input() set appPerm(permission: PERMISSION) {
    this.permName = permission;
  }

  @Input() set appPermArgs(args: any[]) {
    this.permArgs = args;
    this.hasPerm = PermDirective.checkPerm(this.permName, this.permArgs);
  }

  @Input() set appPermElse(templateRef: TemplateRef<any>) {
    if (!this.hasPerm) {
      this.viewContainer.createEmbeddedView(templateRef);
    }
  }
}
