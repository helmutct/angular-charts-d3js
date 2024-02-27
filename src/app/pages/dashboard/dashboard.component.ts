import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'zr-dashboard',
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent {

  constructor() { }

}
