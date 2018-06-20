import { Component, OnInit } from '@angular/core';
import { Account } from '../models/Account';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent{
    currentAccount: Account;    
    constructor() {
        this.currentAccount = JSON.parse(localStorage.getItem('currentUser'));
    }    
}