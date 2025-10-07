import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { ALL_STATES } from '../../testing/ngxs-test-helper';
import { TeamModalComponent } from './team-modal.component';

describe('TeamModalComponent', () => {
  let component: TeamModalComponent;
  let fixture: ComponentFixture<TeamModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TeamModalComponent],
      imports: [HttpClientModule, NoopAnimationsModule, NgxsModule.forRoot(ALL_STATES), ToastrModule.forRoot({})],
      providers: [NgbActiveModal],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
