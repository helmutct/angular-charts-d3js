import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
declare var $: any;
import { Router } from '@angular/router';
import { questions } from './data';


@Component({
  selector: 'zr-facial-investigation-view-data',
  templateUrl: './facial-investigation-customer-view-data.component.html',
  styleUrls: ['./facial-investigation-customer-view-data.component.scss'],
  animations: [routerTransition()]
})
export class FacialAlertsCustomerViewDataComponent implements OnInit, OnDestroy {
  data: any[];
  alert: boolean;
  tipeOfAttendment:String;
  answer1: String;
  answer2: String;
  answer3: String;

  questiontoMake: String;
  choice1: any;
  choice2: any;
  choice3: any;

  dateQuestion1: Date;
  dateQuestion2: Date;
  dateQuestion3: Date;

  dateAnswer1: Date;
  dateAnswer2: Date;
  dateAnswer3: Date;

  successMessages: String[] = [];
  errorMessages: String[] = [];
  photo: Blob;
  constructor(private router: Router) {
    this.alert=false;
    this.data = questions;
    this.questiontoMake = this.data[0].name;
    this.choice1 = this.data[0].series[0].value;
    this.choice2 = this.data[0].series[1].value;
    this.choice3 = this.data[0].series[2].value;
  }


  ngOnInit() {

  }

  ngOnDestroy() {

  }

  onImageChanged(imagem: Blob) {
    this.photo = imagem;
    
  }

  onImageError(message: string) {
    this.successMessages = [];
    this.errorMessages = [message];

  }

  photoUploaded() {
    console.log("Forca")
    this.alert=true;
    if(this.photo != null){
      this.dateAnswer1 = new Date();
      
    }    
    jQuery("#row-question").css('display', 'block');
  }

  question(answer: any, question: any) {
    if (this.data[0].name === question) {
      this.answer1 = answer;
      console.log(this.answer1);
    this.questiontoMake = this.data[1].name;
    this.choice1 = this.data[1].series[0].value;
    this.choice2 = this.data[1].series[1].value;
    this.choice3 = this.data[1].series[2].value;
    }
    else if (this.data[1].name === question) {
      this.answer2 = answer;
      console.log(this.answer2);
      this.questiontoMake = this.data[2].name;
      this.choice1 = this.data[2].series[0].value;
      this.choice2 = this.data[2].series[1].value;
      this.choice3 = this.data[2].series[2].value;
    }
    else {
      this.answer3 = answer;
      this.router.navigateByUrl("/facial/cliente?d=H38DieA");
    }
  }
}
