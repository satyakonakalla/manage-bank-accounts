import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Account } from '../models/Account';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    logout() {
        localStorage.removeItem('currentUser');        
    }

    getCustomerAccountByCID(customerIdentifier: string) {
        return this.http.post<any>('/api/getCustomerAccountByCID', {customerIdentifier:customerIdentifier})
            .map(data => {
                return data;
            });
    }

    getAllCustomerAccounts() {
        return this.http.post<any>('/api/allcustomeraccounts', {})
            .map(data => {
                return data;
            });
    }
}