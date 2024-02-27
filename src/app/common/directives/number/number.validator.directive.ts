import { Directive } from '@angular/core'; //  Will import the angular core features. Required for all components , modules, etc...
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms'; // Will import the angular forms

@Directive({
    selector: '[number-required]',
    providers: [{ provide: NG_VALIDATORS, useExisting: NumberRequiredValidatorDirective, multi: true }]
})
export class NumberRequiredValidatorDirective implements Validator {
    validate(c: FormControl): ValidationErrors {

        let value = '';
        if (c.value != null) {
            value = c.value.toString().replace(',', '.');
        } else {
            value = '';
        }
        const valueNumber = Number(value);
        const isValid = !isNaN(valueNumber) && valueNumber > 0;
        const numberRequired = {
            'number': {
                'message': 'Número precisa ser maior que zero'
            }
        };

        return isValid ? null : numberRequired;
    }
}
