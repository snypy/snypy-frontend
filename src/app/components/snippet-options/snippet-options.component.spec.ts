import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SnippetOptionsComponent } from './snippet-options.component';

describe('SnippetOptionsComponent', () => {
  let component: SnippetOptionsComponent;
  let fixture: ComponentFixture<SnippetOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SnippetOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
