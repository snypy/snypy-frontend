import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import { NgxResourceFactoryModule } from 'ngx-resource-factory';
import { AuthResource } from '../../services/resources/auth.resource';
import { UserResource } from '../../services/resources/user.resource';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockAuthResource = jasmine.createSpyObj('AuthResource', {
    currentUser: { username: 'test' } as any,
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [NgxsModule.forRoot(), NgxResourceFactoryModule.forRoot(), HttpClientModule, NgbModule],
      providers: [{ provide: AuthResource, useValue: mockAuthResource }, UserResource],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
