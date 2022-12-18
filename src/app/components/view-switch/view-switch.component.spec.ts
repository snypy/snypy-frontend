import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ViewSwitchComponent } from './view-switch.component';

describe('ViewSwitchComponent', () => {
  let component: ViewSwitchComponent;
  let fixture: ComponentFixture<ViewSwitchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSwitchComponent],
      imports: [],
      providers: [],
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
