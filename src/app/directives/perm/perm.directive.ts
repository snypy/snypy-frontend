import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserTeam, RoleEnum, Snippet, User } from '@snypy/rest-client';

export enum PERMISSION {
  'cadAddTeamMember',
  'canEditTeamMember',
  'canDeleteTeamMember',
  'canEditSnippet',
  'canDeleteSnippet',
}

@Directive({
  selector: '[appPerm]',
  standalone: false,
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
  static cadAddTeamMember(userTeam: UserTeam): boolean {
    return userTeam && userTeam.role === RoleEnum.Editor;
  }

  static canEditTeamMember(userTeam: UserTeam): boolean {
    return PermDirective.cadAddTeamMember(userTeam);
  }

  static canDeleteTeamMember(userTeam: UserTeam): boolean {
    return PermDirective.cadAddTeamMember(userTeam);
  }

  static canEditSnippet(user: User, snippet: Snippet): boolean {
    return !!snippet.editable;
  }

  static canDeleteSnippet(user: User, snippet: Snippet): boolean {
    return !!snippet.deletable;
  }

  static canToggleFavorite(user: User, snippet: Snippet): boolean {
    return !!snippet.pk;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

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
