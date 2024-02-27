import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlimScroll } from './slim-scroll/slim-scroll.directive';
import { NumberRequiredValidatorDirective } from './number/number.validator.directive';
import { OnlyNumberDirective } from './number/only-number.directive';
import { RestrictSpecialCharacters } from './string/restrict-special-characters.directive';
import { CnpjMask } from './cnpj-mask/cnpj-mask.directive';
import { IEMask } from './ie-mask/ie-mask.directive';
import { PhoneMask } from './phone-mask/phone-mask.directive';
import { ZipcodeMask } from './zipcode-mask/zipcode-mask.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SlimScroll,
        NumberRequiredValidatorDirective,
        OnlyNumberDirective,
        RestrictSpecialCharacters,
        CnpjMask,
        IEMask,
        PhoneMask,
        ZipcodeMask
    ],
    exports: [
        SlimScroll,
        NumberRequiredValidatorDirective,
        OnlyNumberDirective,
        RestrictSpecialCharacters,
        CnpjMask,
        IEMask,
        PhoneMask,
        ZipcodeMask
    ]
})
export class DirectivesModule { }
