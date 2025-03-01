import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ViewSwitchComponent } from './view-switch.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { ScopeState } from '../../state/scope/scope.state';
import { AuthResource } from '../../services/resources/auth.resource';
import { ToastrModule } from 'ngx-toastr';

describe('ViewSwitchComponent', () => {
  let component: ViewSwitchComponent;
  let fixture: ComponentFixture<ViewSwitchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSwitchComponent],
      imports: [HttpClientModule, NgxsModule.forRoot([ScopeState]), ToastrModule.forRoot({})],
      providers: [AuthResource],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
