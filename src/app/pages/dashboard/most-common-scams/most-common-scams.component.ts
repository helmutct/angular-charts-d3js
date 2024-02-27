import { Component } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'zr-most-common-scams',
  templateUrl: './most-common-scams.component.html',
  styleUrls: ['./most-common-scams.component.scss']
})
export class MostCommonScamsComponent {

  data: any[];

  constructor() {
    this.data = single;
   }

}
