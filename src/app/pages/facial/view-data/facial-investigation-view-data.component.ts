import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
declare var $: any;
import { Router , ActivatedRoute} from '@angular/router';
import {eriberto} from './data-eriberto';
import {jeffrey} from './data-jeffrey';

@Component({
  selector: 'zr-facial-investigation-view-data',
  templateUrl: './facial-investigation-view-data.component.html',
  styleUrls: ['./facial-investigation-view-data.component.scss'],
  animations: [routerTransition()]
})
export class FacialAlertsViewDataComponent implements OnInit, OnDestroy {
  
  nome: String;
  linkName: String;
  fotoPaciente: String;
  fotoOriginal: String;
  dateHour: String;
  questions : any[];
  anotherPhotos1:String;
  anotherPhotos2:String;
  pId: String;
  constructor(private router: Router , private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.pId = params['pid'];
    });
    if(this.pId === "P85uc9412a"){
      this.nome = jeffrey[0].nome;
      this.linkName= jeffrey[0].linkName;
      this.fotoPaciente= jeffrey[0].fotoPaciente;
      this.fotoOriginal= jeffrey[0].fotoOriginal;
      this.dateHour= jeffrey[0].dateHour;
      this.questions =  jeffrey[0].questions;
      this.anotherPhotos1= jeffrey[0].anotherPhotos1;
      this.anotherPhotos2= jeffrey[0].anotherPhotos2;
    }else{
      this.nome = eriberto[0].nome;
      this.linkName= eriberto[0].linkName;
      this.fotoPaciente= eriberto[0].fotoPaciente;
      this.fotoOriginal= eriberto[0].fotoOriginal;
      this.dateHour= eriberto[0].dateHour;
      this.questions =  eriberto[0].questions;
      this.anotherPhotos1= eriberto[0].anotherPhotos1;
      this.anotherPhotos2= eriberto[0].anotherPhotos2;
    }
  }


  ngOnInit() {

  }

  ngOnDestroy() {

  }

  anylise() {
    this.router.navigate(['/facial/analises']);
  }
}
