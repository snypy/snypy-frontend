import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpModalComponent } from './help-modal.component';

describe('HelpModalComponent', () => {
  let component: HelpModalComponent;
  let fixture: ComponentFixture<HelpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
