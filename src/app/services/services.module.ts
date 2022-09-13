import { ModuleWithProviders, NgModule } from '@angular/core';
import { ActiveFilterService } from './navigation/activeFilter.service';
import { AuthResource } from './resources/auth.resource';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    /* declare in `forRoot()` */
  ],
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [AuthResource, ActiveFilterService],
    };
  }
}
