import { Component } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'zr-health-investigation',
  providers: [],
  templateUrl: './health-investigation.component.html',
  styleUrls: ['./health-investigation.component.scss'],
  animations: [routerTransition()]
})
export class HealthInvestigationComponent {

  constructor() { }

}
