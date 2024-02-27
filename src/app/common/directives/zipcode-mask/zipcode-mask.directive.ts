import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

declare var require: any;

let VMasker = require('vanilla-masker');

@Directive({
    selector: '[ZipcodeMask]',
    host: {
        '(ngModelChange)': 'onInputChange()',
      }
})
export class ZipcodeMask {
    public nativeElement: HTMLInputElement;

    constructor(public element: ElementRef, public render: Renderer2) {
        this.nativeElement = this.element.nativeElement;
    }

    onInputChange() {
        let s = this.nativeElement.value;
        s = s.replace(/[_\W]+/g, '');
        let n = s.length;
        let m = '99999-999';
        VMasker(this.nativeElement).maskPattern(m);
    }
}
