import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';
import { ALL_STATES } from '../../testing/ngxs-test-helper';
import { ViewInfoComponent } from './view-info.component';

describe('ViewInfoComponent', () => {
  let component: ViewInfoComponent;
  let fixture: ComponentFixture<ViewInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInfoComponent],
      imports: [HttpClientModule, NgxsModule.forRoot(ALL_STATES)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInfoComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'scope$', { writable: true });
    component.scope$ = of({ area: 'team', value: {} as any });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
