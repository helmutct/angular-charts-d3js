import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

declare var require: any;

let VMasker = require('vanilla-masker');

@Directive({
    selector: '[IEMask]',
    host: {
        '(ngModelChange)': 'onInputChange()',
      }
})
export class IEMask {
    @Input() state: string;
    public nativeElement: HTMLInputElement;

    constructor(public element: ElementRef, public render: Renderer2) {
        this.nativeElement = this.element.nativeElement;
    }

    onInputChange() {
        let s = this.nativeElement.value;
        s = s.replace(/[_\W]+/g, '');
        let n = s.length;
        let m = this.getPatternByState(Number(this.state));

        VMasker(this.nativeElement).maskPattern(m);
    }

    getPatternByState(state) {
        switch (state) {
            case 0:
                return '99999999999999';
            case 1:
                return '99.999.999/999-99';
            case 2:
                return '999999999';
            case 3:
                return '99.999.999-9';
            case 4:
                return '999999999';
            case 5:
                return '999.999.99-9';
            case 6:
                return '99999999-9';
            case 7:
                return '99999999999-99';
            case 8:
                return '999.999.99-9';
            case 9:
                return '99.999.999-9';
            case 10:
                return '999999999';
            case 11:
                return '999.999.999/9999';
            case 12:
                return '999999999';
            case 13:
                return '999999999';
            case 14:
                return '99-999999-9';
            case 15:
                return '99999999-9';
            case 16:
                return '99.9.999.9999999-9';
            case 17:
                return '999999999';
            case 18:
                return '99999999-99';
            case 19:
                return '99.999.99-9';
            case 20:
                return '99.999.999-9';
            case 21:
                return '999.99999-9';
            case 22:
                return '99999999-9';
            case 23:
                return '999-9999999';
            case 24:
                return '999.999.999';
            case 25:
                return '999999999-9';
            case 26:
                return '999.999.999.999';
            case 27:
                return '99999999999';
        }
    }
}
