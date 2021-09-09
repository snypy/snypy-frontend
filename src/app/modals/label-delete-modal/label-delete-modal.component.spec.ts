import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LabelDeleteModalComponent } from './label-delete-modal.component';

describe('LabelDeleteModalComponent', () => {
  let component: LabelDeleteModalComponent;
  let fixture: ComponentFixture<LabelDeleteModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
