import { Pipe, PipeTransform } from '@angular/core';
import removeMarkdown from 'markdown-to-text';

@Pipe({ name: 'removemarkdown' })
export class RemoveMarkdownPipe implements PipeTransform {
  transform(text: string): string {
    return removeMarkdown(text);
  }
}
