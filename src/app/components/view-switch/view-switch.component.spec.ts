import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { ActiveFilterService } from '../../services/navigation/activeFilter.service';
import { AuthResource } from '../../services/resources/auth.resource';
import { ViewSwitchComponent } from './view-switch.component';

describe('ViewSwitchComponent', () => {
  let component: ViewSwitchComponent;
  let fixture: ComponentFixture<ViewSwitchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSwitchComponent],
      imports: [NgxsModule.forRoot(), HttpClientModule, ToastrModule.forRoot({})],
      providers: [AuthResource, ActiveFilterService],
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
