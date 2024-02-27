import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keepTextLineBreaks'})
export class KeepTextLineBreaks implements PipeTransform {

  constructor() {
  }

  transform(value: string): string {

        let newValue;
        if (value != null) {
          newValue = value.replace(/\n/g, '<br/>');
        }
        return `${newValue}`;
      }
}
