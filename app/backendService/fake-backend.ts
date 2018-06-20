import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, 
    HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { STATIC_ACCOUNTS } from '../models/data'

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let useraccounts: any[] = JSON.parse(localStorage.getItem('useraccounts')) || [];
        let staticAccounts: any[] = STATIC_ACCOUNTS;

        return Observable.of(null).mergeMap(() => {

            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                if(staticAccounts.length > 0){
                    for(let i=0;i< staticAccounts.length; i++){
                        let checkUsers = useraccounts.filter(user => {
                            let userObj = JSON.parse(user);
                             return staticAccounts[i].customerIdentifier == userObj.customerIdentifier;
                         });
                         if(checkUsers.length == 0){
                            useraccounts.push(JSON.stringify(staticAccounts[i])); 
                         }                                              
                    }
                    localStorage.setItem('useraccounts', JSON.stringify(useraccounts));
                }

                let filteredUsers = useraccounts.filter(user => {
                   let userObj = JSON.parse(user);
                   return userObj.customerIdentifier == request.body.username && userObj.password == request.body.password;
                });

                if (filteredUsers.length) {
                    let body = JSON.parse(filteredUsers[0]);
                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    return Observable.throw('Customer Identifier or Password is invalid. ');
                }
            }
            
            if (request.url.endsWith('/api/allcustomeraccounts') && request.method === 'POST') {

                let customerAccounts =[];
                if(useraccounts.length > 0){
                    for(let i=0;i< useraccounts.length; i++){
                        customerAccounts.push(useraccounts[i]);
                    }
                }
                return Observable.of(new HttpResponse({ status: 200, body: customerAccounts }));                
            }

            if (request.url.endsWith('/api/getCustomerAccountByCID') && request.method === 'POST') {

                let filteredUsers = useraccounts.filter(user => {
                   let userObj = JSON.parse(user);
                    return userObj.customerIdentifier == request.body.customerIdentifier;
                });
                if (filteredUsers.length) {
                    let body = JSON.parse(filteredUsers[0]);
                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    return Observable.throw('Customer Identifier is invalid. ');
                }
            }
            return next.handle(request);            
        })
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(500)
        .dematerialize();
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};