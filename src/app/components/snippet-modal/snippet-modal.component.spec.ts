import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetModalComponent } from './snippet-modal.component';

describe('SnippetModalComponent', () => {
  let component: SnippetModalComponent;
  let fixture: ComponentFixture<SnippetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnippetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
