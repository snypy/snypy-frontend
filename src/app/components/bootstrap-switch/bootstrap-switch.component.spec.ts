import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapSwitchComponent } from './bootstrap-switch.component';

describe('BootstrapSwitchComponent', () => {
  let component: BootstrapSwitchComponent;
  let fixture: ComponentFixture<BootstrapSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
