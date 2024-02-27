import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { CurrentUser } from '../models/current-user.model';

@Injectable()
export class AuthenticationService {

    username: string;

    constructor(private http: HttpClient) {

    }

    login(username: string, password: string): Observable<boolean> {

        if (username === 'saude@cadarn.com.br' && password === 'admin') {
            const currentUser = new CurrentUser(1, 'helmut@cadarn.com.br', 'gjknfjkl', 'Helmut Tourinho', 1, 'Admin', 6, 2018, 1, 'Cadarn');

            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            return of(true);
        } else {
            return of(false);
        }
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    private handleError(error: Response | any) {
        localStorage.removeItem('currentUser');
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }

    public getAuthUser(): CurrentUser {
        const userJSON = JSON.parse(localStorage.getItem('currentUser'));
        let currentUser: CurrentUser;
        if (userJSON != null) {
            const currentUser: CurrentUser = new CurrentUser(userJSON.idUser, userJSON, userJSON.token, userJSON.name,
                userJSON.roleUserId, userJSON.roleUserName, userJSON.memberSinceMonth, userJSON.memberSinceYear, userJSON.idInstitutionAssociated, userJSON.nameInstitutionAssociated);

                return currentUser;
        }

        return null;
    }

    getUserToken(): string {
        const token = this.getAuthUser().token;

        return token;
    }

    getUserFirstName(): string {
        const allnames = this.getAuthUser().name.split(' ');
        const firstName = allnames.length > 0 ? allnames[0] : '';

        return firstName;
    }
}
