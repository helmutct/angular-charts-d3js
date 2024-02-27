import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'zr-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {
    router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    searchResult(): void {
        this.router.navigate(['pages/search']);
    }
}
