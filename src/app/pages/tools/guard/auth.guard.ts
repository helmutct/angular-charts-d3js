import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { CurrentUser } from '../../../common/models/current-user.model';

@Injectable()
export class AuthGuard implements CanActivate {

    user: CurrentUser;

    constructor(private authenticationService: AuthenticationService,
        private router: Router) {

    }

    redirectIfDashboard(role: String) {

        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                if (e.url === '/dashboard') {
                    switch (role) {
                        case 'SINDIOFERTAS':
                            this.router.navigate(['/financeiro-admin']);
                            break;
                        case 'FEDERATION':
                            this.router.navigate(['/financeiro-federacao']);
                            break;
                        case 'SYNDICATE':
                            this.router.navigate(['/financeiro-sindicato']);
                            break;
                        case 'PARTNER':
                            this.router.navigate(['/financeiro-fornecedor']);
                            break;
                    }
                }
            }
        });
    }

    redirectIfRoleDoesNotApply() {

        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                if (e.url === '/dashboard') {
                    switch (this.user.roleUserName) {
                        case 'SINDIOFERTAS':
                            this.router.navigate(['/financeiro-admin']);
                            break;
                        case 'FEDERATION':
                            this.router.navigate(['/financeiro-federacao']);
                            break;
                        case 'SYNDICATE':
                            this.router.navigate(['/financeiro-sindicato']);
                            break;
                        case 'PARTNER':
                            this.router.navigate(['/financeiro-fornecedor']);
                            break;
                    }
                }
                if (e.url === '/categorias' || e.url === '/fornecedores' || e.url === '/sindicatos' || e.url === '/federacoes' || e.url === '/categorias-de-sindicato') {
                    switch (this.user.roleUserName) {
                        case 'SINDIOFERTAS':
                            break;
                        case 'FEDERATION':
                            this.router.navigate(['/financeiro-federacao']);
                            break;
                        case 'SYNDICATE':
                            this.router.navigate(['/financeiro-sindicato']);
                            break;
                        case 'PARTNER':
                            this.router.navigate(['/financeiro-fornecedor']);
                            break;
                    }
                }
                if (e.url === '/produtos' || e.url === '/compras') {
                    switch (this.user.roleUserName) {
                        case 'SINDIOFERTAS':
                            break;
                        case 'FEDERATION':
                            this.router.navigate(['/financeiro-federacao']);
                            break;
                        case 'SYNDICATE':
                            this.router.navigate(['/financeiro-sindicato']);
                            break;
                        case 'PARTNER':
                            break;
                    }
                }
            }
        });
    }

    canActivate() {
        this.user = this.authenticationService.getAuthUser();

        if (this.user) {
            if (this.user != null) {
                this.redirectIfRoleDoesNotApply();
                // logged in so return true
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        }

        this.router.navigate(['/login']);
        return false;
    }
}
