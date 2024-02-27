import { Component, EventEmitter, Output } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'zr-facial-investigation-customer',
  providers: [],
  templateUrl: './facial-investigation-customer.component.html',
  styleUrls: ['./facial-investigation-customer.component.scss'],
  animations: [routerTransition()]
})
export class FacialInvestigationCustomerComponent {

  error: boolean;
  @Output() onApplyFilters = new EventEmitter();
  overflow:boolean;
  notYeat:boolean;
  value: String;
  denie: String;
  sucess: boolean;
  denied:boolean;
  constructor(private router: Router , private activatedRoute: ActivatedRoute) {
    this.sucess =false;
    this.activatedRoute.queryParams.subscribe(params => {
      this.denie = params['d'];
    });
    console.log(this.denie);
    if(this.denie === "H38DieA"){
      console.log("Entrei");
      this.denied =true;
      jQuery("#denie-div").css('display', 'block');
    }else if("H38DiuA"){
      this.sucess =true;
      jQuery("#approval-div").css('display', 'block');
    }
  }

  search(value: String) {
    if(value.length === 0){
      this.notYeat = false;
      this.error = false;
      this.overflow = false;
    }
    else if(value.length < 18) {
      this.denied =false;
      this.notYeat = true;
      this.error = false;
      this.overflow = false;
    }
    else if (value.length == 18) {
      if (value === '008099787005194973')
        this.router.navigateByUrl("/facial/cliente/analisar");
      else
        this.error = true;
        this.notYeat = false;
        jQuery("#not-found").css('display', 'block');
    }else{
      this.overflow = true;
      this.notYeat = false;
      this.error = false;
    }
  }
}
