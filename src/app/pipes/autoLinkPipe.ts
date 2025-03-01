import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'autolink' })
export class AutoLinkPipe implements PipeTransform {
  // URL pattern that matches most common URL formats
  private urlRegex = /(https?:\/\/[^\s]+)/g;

  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, maxUrlLength = 25): SafeHtml {
    if (!text) {
      return '';
    }

    // Replace URLs with HTML links and shorten the displayed text
    const linkedText = text.replace(this.urlRegex, url => {
      // Create a shortened version of the URL for display
      let displayUrl = url;
      if (url.length > maxUrlLength) {
        // Keep the first part and the domain, truncate the middle
        const urlObj = new URL(url);
        const domain = urlObj.hostname;
        const protocol = urlObj.protocol + '//';

        // Calculate how much space we have left after protocol and domain
        const remainingSpace = maxUrlLength - protocol.length - domain.length - 3; // 3 for "..."

        if (remainingSpace > 5) {
          // We have enough space to show some of the path
          const path = urlObj.pathname + urlObj.search + urlObj.hash;
          const pathStart = path.substring(0, Math.min(remainingSpace, path.length));
          displayUrl = `${protocol}${domain}${pathStart}...`;
        } else {
          // Not enough space, just show protocol and domain
          displayUrl = `${protocol}${domain}...`;
        }
      }

      return `<a href="${url}" title="${url}" target="_blank">${displayUrl}</a>`;
    });

    // Sanitize the HTML to prevent XSS
    return this.sanitizer.bypassSecurityTrustHtml(linkedText);
  }
}
