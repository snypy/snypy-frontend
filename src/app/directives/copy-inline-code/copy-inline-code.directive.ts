import { Directive, HostListener } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';

/**
 * Copies the content of inline code elements (single backticks in markdown)
 * on click. Code blocks inside <pre> are handled by the ngx-markdown
 * clipboard plugin instead.
 */
@Directive({
  selector: '[appCopyInlineCode]',
  standalone: false,
})
export class CopyInlineCodeDirective {
  public constructor(
    private clipboardService: ClipboardService,
    private toastr: ToastrService
  ) {}

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target.tagName === 'CODE' && !target.closest('pre')) {
      if (this.clipboardService.copyFromContent(target.innerText)) {
        this.toastr.success('Copied to clipboard');
      }
    }
  }
}
