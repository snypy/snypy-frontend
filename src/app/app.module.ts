import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppComponent } from './app.component';

/**
 * Icons
 */
import { 
  faCoffee, faCode, faSyncAlt, faGlobe, faEye, faEyeSlash, faStar, faTag, faCloudUploadAlt, faCloudDownloadAlt
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faCoffee, faCode, faSyncAlt, faGlobe, faEye, faEyeSlash, faStar, faTag, faCloudUploadAlt, faCloudDownloadAlt);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
