import { Component, OnInit } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

import { UserResource, User } from './services/resources/user.resource';
import { LabelResource, Label } from './services/resources/label.resource';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  currentUser = 1;
  labels: ResourceModel<Label>[] = [];

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

    library.add(faCoffee, faCode, faSyncAlt, faGlobe, faEye, faEyeSlash, faStar, faTag, faCloudUploadAlt, faCloudDownloadAlt, faUser, faPlus);


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

  constructor(private labelResource: LabelResource) {
  }

  ngOnInit() {

    this.labelResource.query({user: this.currentUser}).$promise
      .then((data) => {
        this.labels = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  randomNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }
}
