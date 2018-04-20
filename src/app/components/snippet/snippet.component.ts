import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent implements OnInit {

  codeSample = `
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';

    import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
    import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
    import { NgSelectModule } from '@ng-select/ng-select';
    import { Ng2HandySyntaxHighlighterModule } from 'ng2-handy-syntax-highlighter';
    import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
    import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
    import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

    const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
      suppressScrollX: true
    };

    import { AppComponent } from './app.component';

    /**
     * Icons
     */
    import {
      faCoffee, faCode, faSyncAlt, faGlobe, faEye, faEyeSlash, faStar, faTag, faCloudUploadAlt, faCloudDownloadAlt, faUser, faPlus
    } from '@fortawesome/free-solid-svg-icons';
    import { library } from '@fortawesome/fontawesome-svg-core';

    library.add(
      faCoffee,
      faCode,
      faSyncAlt,
      faGlobe,
      faEye,
      faEyeSlash,
      faStar,
      faTag,
      faCloudUploadAlt,
      faCloudDownloadAlt,
      faUser,
      faPlus
    );


    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        FontAwesomeModule,
        NgbModule.forRoot(),
        PerfectScrollbarModule,
        NgSelectModule,
        FormsModule,
        Ng2HandySyntaxHighlighterModule,
      ],
      providers: [
        {
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
  `;

  constructor() { }

  ngOnInit() {
  }

}
