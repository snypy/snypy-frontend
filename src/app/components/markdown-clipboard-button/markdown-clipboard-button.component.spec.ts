import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MarkdownClipboardButtonComponent } from './markdown-clipboard-button.component';

describe('MarkdownClipboardButtonComponent', () => {
  let component: MarkdownClipboardButtonComponent;
  let fixture: ComponentFixture<MarkdownClipboardButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MarkdownClipboardButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownClipboardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to copied state on click', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.copied).toBeTrue();
    expect(fixture.nativeElement.textContent).toContain('copied');
  });

  it('should reset copied state after timeout', done => {
    component.onCopied();
    expect(component.copied).toBeTrue();

    setTimeout(() => {
      expect(component.copied).toBeFalse();
      done();
    }, 2100);
  });
});
