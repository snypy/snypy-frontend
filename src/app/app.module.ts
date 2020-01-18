import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxResourceFactoryModule } from 'ngx-resource-factory';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { NgPipesModule } from 'ngx-pipes';
import { ToastrModule } from "ngx-toastr";
import { NgxAnxFormsModule } from "ngx-anx-forms";

import { ServicesModule } from './services/services.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

/**
 * Icons
 */
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import { LabelsComponent } from './components/labels/labels.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { MenuComponent } from './components/menu/menu.component';
import { SnippetsComponent } from './components/snippets/snippets.component';
import { SnippetComponent } from './components/snippet/snippet.component';
import { SnippetOptionsComponent } from './components/snippet-options/snippet-options.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SnippetOrderComponent } from './components/snippet-order/snippet-order.component';
import { TeamsComponent } from './components/teams/teams.component';
import { ViewInfoComponent } from './components/view-info/view-info.component';
import { ViewSwitchComponent } from './components/view-switch/view-switch.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ContentComponent } from './layout/content/content.component';
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { BaseComponent } from './layout/base/base.component';
import { BootstrapSwitchComponent } from './components/bootstrap-switch/bootstrap-switch.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { LoadingScreenInterceptor } from "./helpers/loading.interceptor";
import { TeamMembersComponent } from './components/team-members/team-members.component';

import { SnippetModalComponent } from './modals/snippet-modal/snippet-modal.component';
import { LabelModalComponent } from './modals/label-modal/label-modal.component';
import { TeamModalComponent } from './modals/team-modal/team-modal.component';
import { HelpModalComponent } from './modals/help-modal/help-modal.component';
import { TeamMemberModalComponent } from './modals/team-member-modal/team-member-modal.component';
import { TeamMemberDeleteModalComponent } from './modals/team-member-delete-modal/team-member-delete-modal.component';
import { LabelDeleteModalComponent } from './modals/label-delete-modal/label-delete-modal.component';
import { PermDirective } from './directives/perm/perm.directive';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterCompleteComponent } from './components/auth/register-complete/register-complete.component';


library.add(
  fas.faCoffee,
  fas.faCode,
  fas.faSyncAlt,
  fas.faGlobe,
  fas.faEye,
  fas.faEyeSlash,
  fas.faTag,
  fas.faCloudUploadAlt,
  fas.faCloudDownloadAlt,
  fas.faUser,
  fas.faPlus,
  fas.faStar,
  far.faStar,
  fas.faTrash,
  fas.faCircle,
  fas.faHashtag,
);

@NgModule({
  declarations: [
    AppComponent,
    LabelsComponent,
    LanguagesComponent,
    MenuComponent,
    SnippetsComponent,
    SnippetComponent,
    SnippetOptionsComponent,
    FooterComponent,
    HeaderComponent,
    SnippetModalComponent,
    SnippetOrderComponent,
    LabelModalComponent,
    TeamsComponent,
    ViewInfoComponent,
    ViewSwitchComponent,
    TeamModalComponent,
    SidebarComponent,
    ContentComponent,
    LoginComponent,
    HelpModalComponent,
    TeamMembersComponent,
    TeamMemberModalComponent,
    TeamMemberDeleteModalComponent,
    LabelDeleteModalComponent,
    BaseComponent,
    BootstrapSwitchComponent,
    LoadingScreenComponent,
    PermDirective,
    AuthComponent,
    RegisterComponent,
    RegisterCompleteComponent,
  ],
  entryComponents: [
    SnippetModalComponent,
    LabelModalComponent,
    TeamModalComponent,
    HelpModalComponent,
    TeamMemberModalComponent,
    TeamMemberDeleteModalComponent,
    LabelDeleteModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxResourceFactoryModule.forRoot(),
    NgbModule,
    FontAwesomeModule,
    PerfectScrollbarModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
    NgPipesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxAnxFormsModule.forRoot(),

    ServicesModule.forRoot(),
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
