import { Component, Inject, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'zr-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss'],
  animations: [routerTransition()]
})
export class HealthHistoricComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document) {
  }

  ngOnInit() {
    this.document.getElementById('internal-preloader').setAttribute('style', 'display: none;');
  }

  onApplyFilters(event: any) {
  }

}
