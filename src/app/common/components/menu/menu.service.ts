import { Injectable } from '@angular/core';
import { menuItems } from './menu';

@Injectable()
export class MenuService {

  constructor() {
  }

  public getMenuItems(): Array<Object> {

    return menuItems;
  }

}
