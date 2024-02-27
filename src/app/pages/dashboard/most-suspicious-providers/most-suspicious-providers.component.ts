import { Component } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'zr-most-suspicious-providers',
  templateUrl: './most-suspicious-providers.component.html',
  styleUrls: ['./most-suspicious-providers.component.scss']
})
export class MostSuspiciousProvidersComponent  {

  data: any[];

  constructor() {
    this.data = single;
   }

}
