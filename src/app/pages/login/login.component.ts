import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from '../../common/services/authentication.service';

@Component({
  selector: 'cd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public router: Router;
    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public error = '';
    formSubmitted = false;

    constructor( router: Router, fb: FormBuilder,
                 private authenticationService: AuthenticationService ) {
        this.router = router;
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, emailValidator])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    public onSubmit(values: Object): void {

        this.formSubmitted = true;

        if (this.form.valid) {

            this.authenticationService.login(this.email.value, this.password.value)
                .subscribe(result => {
                    if (result === true) {
                        this.router.navigate(['/dashboard']);
                    } else {
                        this.error = 'Usuário ou senha inválidos.';
                    }
                    this.formSubmitted = false;
                },
                error => {
                    this.error = 'Usuário ou senha inválidos.';
                    this.formSubmitted = false;
                });
        }
    }
}

export function emailValidator(control: FormControl): {[key: string]: any} {
    const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}
