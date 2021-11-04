import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxResourceFactoryModule } from 'ngx-resource-factory';
import { AppComponent } from './app.component';
import { AuthResource } from './services/resources/auth.resource';
import { UserResource } from './services/resources/user.resource';
describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [NgxResourceFactoryModule.forRoot(), HttpClientModule],
      providers: [AuthResource, UserResource],
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
