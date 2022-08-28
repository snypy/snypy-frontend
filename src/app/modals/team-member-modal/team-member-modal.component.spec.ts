import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { TeamMemberModalComponent } from './team-member-modal.component';

describe('TeamMemberModalComponent', () => {
  let component: TeamMemberModalComponent;
  let fixture: ComponentFixture<TeamMemberModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TeamMemberModalComponent],
      imports: [HttpClientModule, NgxsModule.forRoot(), ToastrModule.forRoot({})],
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
