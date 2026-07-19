import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';

import { CopyInlineCodeDirective } from './copy-inline-code.directive';

@Component({
  template: `<div appCopyInlineCode>
    <code>inline code</code>
    <pre><code>block code</code></pre>
  </div>`,
  standalone: false,
})
class TestHostComponent {}

describe('CopyInlineCodeDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let clipboardService: jasmine.SpyObj<ClipboardService>;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(waitForAsync(() => {
    clipboardService = jasmine.createSpyObj('ClipboardService', ['copyFromContent']);
    toastr = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      declarations: [CopyInlineCodeDirective, TestHostComponent],
      providers: [
        { provide: ClipboardService, useValue: clipboardService },
        { provide: ToastrService, useValue: toastr },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should copy inline code on click', () => {
    clipboardService.copyFromContent.and.returnValue(true);

    const inlineCode: HTMLElement = fixture.nativeElement.querySelector('div > code');
    inlineCode.click();

    expect(clipboardService.copyFromContent).toHaveBeenCalledWith('inline code');
    expect(toastr.success).toHaveBeenCalledWith('Copied to clipboard');
  });

  it('should ignore code inside pre blocks', () => {
    const blockCode: HTMLElement = fixture.nativeElement.querySelector('pre > code');
    blockCode.click();

    expect(clipboardService.copyFromContent).not.toHaveBeenCalled();
  });

  it('should not notify when copy fails', () => {
    clipboardService.copyFromContent.and.returnValue(false);

    const inlineCode: HTMLElement = fixture.nativeElement.querySelector('div > code');
    inlineCode.click();

    expect(toastr.success).not.toHaveBeenCalled();
  });
});
