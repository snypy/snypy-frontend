import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-markdown-clipboard-button',
  templateUrl: './markdown-clipboard-button.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class MarkdownClipboardButtonComponent implements OnDestroy {
  copied = false;

  private resetTimeout: ReturnType<typeof setTimeout>;

  constructor(private cdr: ChangeDetectorRef) {}

  onCopied(): void {
    this.copied = true;
    clearTimeout(this.resetTimeout);
    this.resetTimeout = setTimeout(() => {
      this.copied = false;
      this.cdr.markForCheck();
    }, 2000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.resetTimeout);
  }
}
