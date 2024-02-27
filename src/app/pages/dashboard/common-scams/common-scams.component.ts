import { Component } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'zr-common-scams',
  templateUrl: './common-scams.component.html',
  styleUrls: ['./common-scams.component.scss'],
  animations: [routerTransition()]
})
export class CommonScamsComponent {

  data: any[];

  constructor() {  }

}
