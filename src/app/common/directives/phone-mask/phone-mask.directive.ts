import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

declare var require: any;

let VMasker = require('vanilla-masker');

@Directive({
    selector: '[PhoneMask]',
    host: {
        '(ngModelChange)': 'onInputChange()',
      }
})
export class PhoneMask {
    public nativeElement: HTMLInputElement;

    constructor(public element: ElementRef, public render: Renderer2) {
        this.nativeElement = this.element.nativeElement;
    }

    onInputChange() {
        let s = this.nativeElement.value;
        s = s.replace(/[_\W]+/g, '');
        let n = s.length;
        let m;
        if (n < 11) {
            m = '(99) 9999-9999'; 
        } else {
            m = '(99) 99999-9999'; 
        }
        VMasker(this.nativeElement).maskPattern(m);
    }
}
