import { Component, EventEmitter, Output } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { auditoria } from './data.auditoria';
import { multiChange } from './data-change';
import { auditoriaChange } from './data.auditoria-change';
import {multi} from './data-multi';

@Component({
  selector: 'zr-facial-investigation',
  providers: [],
  templateUrl: './facial-investigation.component.html',
  styleUrls: ['./facial-investigation.component.scss'],
  animations: [routerTransition()]
})
export class FacialComponent {
  auditoriaPendente: number;
  eventos: any[];
  auditorias: any[];
  today = new Date();
  pendente :number;
  totalEventos :number;
  totalAlertas :number;
  percentagem: number;

  month: String;
  @Output() onApplyFilters = new EventEmitter();

  constructor(private router: Router) {
    this.eventos = multi;
    this.auditorias = auditoria;
    this.month = this.applyMonthChange();
    this.pendente = this.auditorias[0].value;
    this.totalEventos = this.eventos[0].series[0].value + this.eventos[0].series[1].value + this.eventos[1].series[0].value + this.eventos[1].series[1].value + this.eventos[2].series[0].value + this.eventos[2].series[1].value;
    this.totalAlertas = this.eventos[0].series[0].value + this.eventos[1].series[0].value + this.eventos[2].series[0].value;
    this.percentagem = this.totalAlertas * 100 / this.totalEventos;
  }

  search() {
    this.router.navigate(['/facial/analises/alertas']);
  }

  applyFilterr(event:any){
    if(this.applyMonthChange() === event){
      this.eventos = multi;
      this.auditorias = auditoria;
      this.pendente = this.auditorias[0].value;
      this.totalEventos = this.eventos[0].series[0].value + this.eventos[0].series[1].value + this.eventos[1].series[0].value + this.eventos[1].series[1].value + this.eventos[2].series[0].value + this.eventos[2].series[1].value;
      this.totalAlertas = this.eventos[0].series[0].value + this.eventos[1].series[0].value + this.eventos[2].series[0].value;
      this.percentagem = this.totalAlertas * 100 / this.totalEventos;
      
    }else{
      this.eventos = multiChange;
      this.auditorias = auditoriaChange;
      this.pendente = this.auditorias[0].value;
      this.totalEventos = this.eventos[0].value;
      this.totalEventos = this.eventos[0].series[0].value + this.eventos[0].series[1].value + this.eventos[1].series[0].value + this.eventos[1].series[1].value + this.eventos[2].series[0].value + this.eventos[2].series[1].value;
      this.totalAlertas = this.eventos[0].series[0].value + this.eventos[1].series[0].value + this.eventos[2].series[0].value;
      this.percentagem = this.totalAlertas * 100 / this.totalEventos;
    }
    this.month = event;
  }

  applyMonthChange(){
    const monthNumber: number = this.today.getMonth() + 1;
    const month: String = monthNumber < 10 ? "0" + String(monthNumber) : String(monthNumber);
    var year = this.today.getFullYear();
    const toReturn = year + "-" + month;

    return toReturn;
  }
}
