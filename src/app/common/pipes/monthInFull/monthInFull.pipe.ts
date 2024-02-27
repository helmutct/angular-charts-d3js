import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'monthInFull' })
export class MonthInFull implements PipeTransform {

  constructor() {
  }

  transform(month: number): string {

    let monthInFull: string;
    switch (month) {
      case 1: {
        monthInFull = 'Janeiro';
        break;
      }
      case 2: {
        monthInFull = 'Fevereiro';
        break;
      }
      case 3: {
        monthInFull = 'Março';
        break;
      }
      case 4: {
        monthInFull = 'Abril';
        break;
      }
      case 5: {
        monthInFull = 'Maio';
        break;
      }
      case 6: {
        monthInFull = 'Junho';
        break;
      }
      case 7: {
        monthInFull = 'Julho';
        break;
      }
      case 8: {
        monthInFull = 'Agosto';
        break;
      }
      case 9: {
        monthInFull = 'Setembro';
        break;
      }
      case 10: {
        monthInFull = 'Outubro';
        break;
      }
      case 11: {
        monthInFull = 'Novembro';
        break;
      }
      case 12: {
        monthInFull = 'Dezembro';
        break;
      }
      default: {
        monthInFull = '';
        break;
      }
    }
    return monthInFull;
  }

}
