import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthActivateComponent } from './auth-activate.component';

describe('AuthActivateComponent', () => {
  let component: AuthActivateComponent;
  let fixture: ComponentFixture<AuthActivateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
