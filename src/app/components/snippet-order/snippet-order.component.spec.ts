import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SnippetOrderComponent } from './snippet-order.component';

describe('SnippetOrderComponent', () => {
  let component: SnippetOrderComponent;
  let fixture: ComponentFixture<SnippetOrderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SnippetOrderComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
