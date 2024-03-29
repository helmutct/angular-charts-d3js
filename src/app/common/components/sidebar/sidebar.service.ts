import { Injectable, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { SidebarItem } from './sidebar-item.model';
import { sidebarItems } from './sidebar-items';
import { AppState } from '../../../app.state';

@Injectable()
export class SidebarService {
    constructor(private state: AppState,
                private location: Location,
                private renderer2: Renderer2,
                private router: Router) { }

    public getSidebarItems(): Array<SidebarItem> {
        return sidebarItems;
    }

    public createSidebarMenu(menu: Array<SidebarItem>, nativeElement) {
        const menu0 = this.renderer2.createElement('div');
        this.renderer2.setAttribute(menu0, 'id', 'menu0');
        menu.forEach((menuItem) => {
            if (menuItem.parentId === 0) {
            const subMenu = this.createSidebarItem(menu, menuItem);
            this.renderer2.appendChild(menu0, subMenu);
            }
        });
        this.renderer2.appendChild(nativeElement, menu0);
    }

    public createSidebarItem(menu: Array<SidebarItem>, sidebarItem) {
        const div = this.renderer2.createElement('div');
        this.renderer2.addClass(div, 'card');
        const link = this.renderer2.createElement('a');
        this.renderer2.addClass(link, 'menu-item-link');
        const icon = this.renderer2.createElement('i');
        this.renderer2.addClass(icon, 'fa');
        this.renderer2.addClass(icon, sidebarItem.icon);
        this.renderer2.appendChild(link, icon);
        const span = this.renderer2.createElement('span');
        this.renderer2.addClass(span, 'menu-title');
        this.renderer2.appendChild(link, span);
        const menuText = this.renderer2.createText(sidebarItem.title);
        this.renderer2.appendChild(span, menuText);
        this.renderer2.setAttribute(link, 'id', 'link' + sidebarItem.id);
        this.renderer2.addClass(link, 'transition');
        this.renderer2.appendChild(div, link);
        this.renderer2.listen(link, 'click', () => {
            this.state.notifyDataChanged('menu.isCollapsed', false);
        });
        this.renderer2.listen(link, 'mouseenter', ($event) => {
            this.state.notifyDataChanged('menu.hovered', $event);
        });
        if (sidebarItem.routerLink) {
            this.renderer2.listen(link, 'click', () => {
                this.router.navigate([sidebarItem.routerLink]);
                this.setActiveLink(menu, link);
                this.closeOtherSubMenus(div);
            });
        }
        if (sidebarItem.href) {
            this.renderer2.setAttribute(link, 'href', sidebarItem.href);
        }
        if (sidebarItem.target) {
            this.renderer2.setAttribute(link, 'target', sidebarItem.target);
        }
        if (sidebarItem.hasSubMenu) {
            this.renderer2.addClass(link, 'collapsed');
            const caret = this.renderer2.createElement('b');
            this.renderer2.addClass(caret, 'fa');
            this.renderer2.addClass(caret, 'fa-angle-up');
            this.renderer2.appendChild(link, caret);
            this.renderer2.setAttribute(link, 'data-toggle', 'collapse');
            this.renderer2.setAttribute(link, 'data-parent', '#menu' + sidebarItem.parentId);
            this.renderer2.setAttribute(link, 'href', '#collapse' + sidebarItem.id);
            const collapse = this.renderer2.createElement('div');
            this.renderer2.setAttribute(collapse, 'id', 'collapse' + sidebarItem.id);
            this.renderer2.addClass(collapse, 'collapse');
            this.renderer2.appendChild(div, collapse);
            this.createSubMenu(menu, sidebarItem.id, collapse);
        }
        return div;
    }

    private createSubMenu(menu: Array<SidebarItem>, menuItemId, parentElement) {
        const menus = menu.filter(item => item.parentId === menuItemId);
        menus.forEach((menuItem) => {
            const subMenu = this.createSidebarItem(menu, menuItem);
            this.renderer2.appendChild(parentElement, subMenu);
        });
    }

    private closeOtherSubMenus(elem) {
        const children = (this.renderer2.parentNode(elem)).children;
        for (let i = 0; i < children.length; i++) {
            const child = this.renderer2.nextSibling(children[i].children[0]);
            if (child) {
                this.renderer2.setAttribute(children[i].children[0], 'aria-expanded', 'false');
                this.renderer2.addClass(children[i].children[0], 'collapsed');
                this.renderer2.removeClass(child, 'show');
            }
        }
    }


    public getActiveLink(menu: Array<SidebarItem>) {
        const url = this.location.path();
        const routerLink = url.substring(1, url.length);
        const activeMenuItem = menu.filter(item => item.routerLink === routerLink);
        if (activeMenuItem[0]) {
            const activeLink = document.querySelector('#link' + activeMenuItem[0].id);
            return activeLink;
        }
        return false;
    }

    public setActiveLink(menu: Array<SidebarItem>, link) {
        if (link) {
            menu.forEach((menuItem) => {
                const activeLink = document.querySelector('#link' + menuItem.id);
                if (activeLink) {
                    if (activeLink.classList.contains('active-link')) {
                        activeLink.classList.remove('active-link');
                    }
                }
            });
            this.renderer2.addClass(link, 'active-link');
        }
    }

    public showActiveSubMenu(menu: Array<SidebarItem>) {
      const url = this.location.path();
      const routerLink = url.substring(1, url.length);
      const activeMenuItem = menu.filter(item => item.routerLink === routerLink);
      if (activeMenuItem[0]) {
        const activeLink = document.querySelector('#link' + activeMenuItem[0].id);
        let parent = this.renderer2.parentNode(activeLink);
        while (this.renderer2.parentNode(parent)) {
            parent = this.renderer2.parentNode(parent);
            if (parent.className === 'collapse') {
                const parentMenu = menu.filter(item => item.id === activeMenuItem[0].parentId);
                const activeParentLink = document.querySelector('#link' + parentMenu[0].id);
                this.renderer2.removeClass(activeParentLink, 'collapsed');
                this.renderer2.addClass(parent, 'show');
            }
            if (parent.classList.contains('menu-wrapper')) {
                break;
            }
        }
      }

  }

    public closeAllSubMenus() {
        const menu = document.getElementById('menu0');
        const children = menu.children;
        for (let i = 0; i < children.length; i++) {
            const child = this.renderer2.nextSibling(children[i].children[0]);
            if (child) {
                this.renderer2.setAttribute(children[i].children[0], 'aria-expanded', 'false');
                this.renderer2.addClass(children[i].children[0], 'collapsed');
                this.renderer2.removeClass(child, 'show');
            }
        }
    }
}
