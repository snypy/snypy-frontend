import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { NgxResourceFactoryModule } from 'ngx-resource-factory';
import { ToastrModule } from 'ngx-toastr';
import { ActiveFilterService } from '../../services/navigation/activeFilter.service';
import { AuthResource } from '../../services/resources/auth.resource';
import { UserResource } from '../../services/resources/user.resource';
import { ViewSwitchComponent } from './view-switch.component';

describe('ViewSwitchComponent', () => {
  let component: ViewSwitchComponent;
  let fixture: ComponentFixture<ViewSwitchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSwitchComponent],
      imports: [NgxsModule.forRoot(), NgxResourceFactoryModule.forRoot(), HttpClientModule, ToastrModule.forRoot({})],
      providers: [AuthResource, UserResource, ActiveFilterService],
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
