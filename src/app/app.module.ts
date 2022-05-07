import { ButtonModule, FormFieldModule, IconModule } from '@anglify/components';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
/**
 * Icons
 */
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxAnxFormsModule } from 'ngx-anx-forms';
import { ClipboardModule } from 'ngx-clipboard';
import { MarkdownModule } from 'ngx-markdown';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { NgPipesModule } from 'ngx-pipes';
import { NgxResourceFactoryModule } from 'ngx-resource-factory';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AuthActivateComponent } from './components/auth-activate/auth-activate.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PasswordResetCompleteComponent } from './components/auth/password-reset-complete/password-reset-complete.component';
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';
import { RegisterCompleteComponent } from './components/auth/register-complete/register-complete.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BootstrapSwitchComponent } from './components/bootstrap-switch/bootstrap-switch.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LabelsComponent } from './components/labels/labels.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { MenuComponent } from './components/menu/menu.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { SnippetOptionsComponent } from './components/snippet-options/snippet-options.component';
import { SnippetOrderComponent } from './components/snippet-order/snippet-order.component';
import { SnippetComponent } from './components/snippet/snippet.component';
import { SnippetsComponent } from './components/snippets/snippets.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { TeamsComponent } from './components/teams/teams.component';
import { ViewInfoComponent } from './components/view-info/view-info.component';
import { ViewSwitchComponent } from './components/view-switch/view-switch.component';
import { PermDirective } from './directives/perm/perm.directive';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { LoadingScreenInterceptor } from './helpers/loading.interceptor';
import { BaseComponent } from './layout/base/base.component';
import { ContentComponent } from './layout/content/content.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HelpModalComponent } from './modals/help-modal/help-modal.component';
import { LabelDeleteModalComponent } from './modals/label-delete-modal/label-delete-modal.component';
import { LabelModalComponent } from './modals/label-modal/label-modal.component';
import { SnippetModalComponent } from './modals/snippet-modal/snippet-modal.component';
import { TeamMemberDeleteModalComponent } from './modals/team-member-delete-modal/team-member-delete-modal.component';
import { TeamMemberModalComponent } from './modals/team-member-modal/team-member-modal.component';
import { TeamModalComponent } from './modals/team-modal/team-modal.component';
import { RemoveMarkdownPipe } from './pipes/removeMarkdownPipe';
import { ServicesModule } from './services/services.module';
import { LabelState } from './state/label/label.state';
import { LanguageState } from './state/language/language.state';
import { ScopeState } from './state/scope/scope.state';
import { SnippetState } from './state/snippet/snippet.state';
import { FullscreenComponent } from './layout/fullscreen/fullscreen.component';
import { ApiModule, Configuration, ConfigurationParameters } from '@snypy/rest-client';
import { environment } from '../environments/environment';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: BaseComponent,
    children: [],
  },
  {
    path: 'snippet/:id',
    component: FullscreenComponent,
  },
  {
    path: 'verify-user',
    component: AuthActivateComponent,
  },
  {
    path: 'set-password',
    component: SetPasswordComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.basePath,
  };
  return new Configuration(params);
}

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
    AuthActivateComponent,
    PasswordResetComponent,
    PasswordResetCompleteComponent,
    SetPasswordComponent,
    RemoveMarkdownPipe,
    FullscreenComponent,
  ],
  imports: [
    ApiModule.forRoot(apiConfigFactory),
    BrowserModule,
    HttpClientModule,
    NgxResourceFactoryModule.forRoot(),
    NgbModule,
    FontAwesomeModule,
    PerfectScrollbarModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldModule,
    ButtonModule,
    IconModule,
    MonacoEditorModule.forRoot(),
    NgPipesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxAnxFormsModule.forRoot(),
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    NgxsModule.forRoot([ScopeState, LanguageState, LabelState, SnippetState]),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ServicesModule.forRoot(),
    MarkdownModule.forRoot(),
    ClipboardModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true,
    },
    { provide: Window, useValue: window },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
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
      far.faCopy
    );
  }
}
