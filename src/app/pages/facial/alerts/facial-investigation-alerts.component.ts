import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { BsEventsService } from '../../../common/services/bs-events.service/bs-events.service';
declare var $: any;
import { Router , ActivatedRoute} from '@angular/router';
import {eriberto} from './data-eriberto';
import {jeffrey} from './data-jeffrey';

@Component({
  selector: 'zr-facial-investigation-alerts',
  templateUrl: './facial-investigation-alerts.component.html',
  styleUrls: ['./facial-investigation-alerts.component.scss'],
  providers: [BsEventsService],
  animations: [routerTransition()]
})
export class FacialAlertsComponent implements OnInit, OnDestroy {
  nome: String;
  linkName: String;
  fotoOriginal: String;
  cpf: String;
  numeroBeneficio: String;
  nomeMae: String;
  nomePai: String;
  dataNascimento: String;
  cidadeNatal: String;
  endereco: String;
  cep: String;
  choices: any[];
  pId: String;

  constructor(private router: Router , private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.pId = params['pid'];
    });
    if(this.pId === "P85uc9412a"){
      this.nome = jeffrey[0].nome;
      this.linkName= jeffrey[0].linkName;
      console.log(this.linkName);
      this.fotoOriginal= jeffrey[0].fotoOriginal;
      this.cpf= jeffrey[0].cpf;
      this.numeroBeneficio= jeffrey[0]["numero-beneficio"];
      this.nomeMae= jeffrey[0]["nome-mae"];
      this.nomePai= jeffrey[0]["nome-pai"]
      this.dataNascimento= jeffrey[0]["data-nascimento"];
      this.cidadeNatal= jeffrey[0]["cidade-natal"];
      this.endereco= jeffrey[0].endereco;
      this.cep=jeffrey[0].cep;
      this.choices =  jeffrey[0].choices;
    }else{
      this.nome = eriberto[0].nome;
      this.linkName= eriberto[0].linkName;
      this.fotoOriginal= eriberto[0].fotoOriginal;
      this.cpf= eriberto[0].cpf;
      this.numeroBeneficio= eriberto[0]["numero-beneficio"];
      this.nomeMae= eriberto[0]["nome-mae"];
      this.nomePai= eriberto[0]["nome-pai"]
      this.dataNascimento= eriberto[0]["data-nascimento"];
      this.cidadeNatal= eriberto[0]["cidade-natal"];
      this.endereco= eriberto[0].endereco;
      this.cep=eriberto[0].cep;
      this.choices =  eriberto[0].choices;
    }

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
