import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AuthResource } from '../../services/resources/auth.resource';
import { AuthActivateComponent } from './auth-activate.component';

describe('AuthActivateComponent', () => {
  let component: AuthActivateComponent;
  let fixture: ComponentFixture<AuthActivateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthActivateComponent],
      imports: [RouterTestingModule, HttpClientModule, ToastrModule.forRoot({})],
      providers: [AuthResource],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
