import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TeamMemberDeleteModalComponent } from './team-member-delete-modal.component';

describe('TeamMemberDeleteModalComponent', () => {
  let component: TeamMemberDeleteModalComponent;
  let fixture: ComponentFixture<TeamMemberDeleteModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TeamMemberDeleteModalComponent],
      imports: [NgbModule, ToastrModule.forRoot({})],
      providers: [NgbActiveModal],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberDeleteModalComponent);
    component = fixture.componentInstance;
    component.userTeam = { user_display: 'test' } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
