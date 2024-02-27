import { Component , EventEmitter, Output } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { data } from './data';
import { dataAll } from './data-all';
import { dataDone } from './data-done';

@Component({
  selector: 'zr-facial-investigation-working',
  providers: [],
  templateUrl: './facial-investigation-working.component.html',
  styleUrls: ['./facial-investigation-working.component.scss'],
  animations: [routerTransition()]
})
export class FacialWorkingComponent {

    classification = 0;
    providerName: string;
    appId :number = -1;
    month:String;
    data :any[];
    today: Date = new Date();

    @Output() onApplyFilters = new EventEmitter();

    constructor(private router: Router) {
      this.data = dataAll;
      this.month = this.applyMonthChange();
    }

    search() {

      if(this.appId === -1)
        this.data = dataAll;
      else if (this.appId === 1)
        this.data = data;
      else
        this.data = dataDone;
    }

    applyMonthChange(){
      const monthNumber: number = this.today.getMonth() + 1;
      const month: String = monthNumber < 10 ? "0" + String(monthNumber) : String(monthNumber);
      var year = this.today.getFullYear();
      const toReturn = year + "-" + month;
  
      return toReturn;
    }
}
