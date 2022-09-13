import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { ActiveFilterService } from '../../services/navigation/activeFilter.service';
import { AuthResource } from '../../services/resources/auth.resource';
import { ScopeState } from '../../state/scope/scope.state';
import { TeamMembersComponent } from './team-members.component';

describe('TeamMembersComponent', () => {
  let component: TeamMembersComponent;
  let fixture: ComponentFixture<TeamMembersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TeamMembersComponent],
      imports: [HttpClientModule, NgxsModule.forRoot([ScopeState]), ToastrModule.forRoot({})],
      providers: [ActiveFilterService, NgbActiveModal, AuthResource],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
