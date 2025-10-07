import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { ALL_STATES } from '../../testing/ngxs-test-helper';
import { TeamMemberModalComponent } from './team-member-modal.component';

describe('TeamMemberModalComponent', () => {
  let component: TeamMemberModalComponent;
  let fixture: ComponentFixture<TeamMemberModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TeamMemberModalComponent],
      imports: [HttpClientModule, NoopAnimationsModule, NgxsModule.forRoot(ALL_STATES), ToastrModule.forRoot({})],
      providers: [NgbActiveModal],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberModalComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'scope', { writable: true });
    component.scope = { area: 'team', value: {} as any };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
