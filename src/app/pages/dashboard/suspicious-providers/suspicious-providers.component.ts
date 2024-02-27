import { Component } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'zr-suspicious-providers',
  templateUrl: './suspicious-providers.component.html',
  styleUrls: ['./suspicious-providers.component.scss'],
  animations: [routerTransition()]
})
export class SuspiciousProvidersComponent  {

  constructor() {  }

}
