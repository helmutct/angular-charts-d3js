import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'sanitizeHtml'})
export class SanitizeHtml implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  transform(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
