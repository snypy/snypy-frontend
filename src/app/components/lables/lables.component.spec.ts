import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LablesComponent } from './lables.component';

describe('LablesComponent', () => {
  let component: LablesComponent;
  let fixture: ComponentFixture<LablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
