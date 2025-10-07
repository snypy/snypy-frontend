import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ActiveFilterService } from '../../services/navigation/activeFilter.service';
import { TeamsComponent } from './teams.component';
import { ALL_STATES } from '../../testing/ngxs-test-helper';

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TeamsComponent],
      imports: [NgxsModule.forRoot(ALL_STATES), HttpClientModule],
      providers: [ActiveFilterService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
