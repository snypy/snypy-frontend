import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import { ALL_STATES } from '../../testing/ngxs-test-helper';
import { AuthResource } from '../../services/resources/auth.resource';
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
      imports: [NgxsModule.forRoot(ALL_STATES), HttpClientModule, NgbModule],
      providers: [{ provide: AuthResource, useValue: mockAuthResource }],
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
