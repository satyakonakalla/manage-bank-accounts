import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from '../models/Account';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
    moduleId: module.id,
    templateUrl: 'managerhome.component.html'
})

export class ManagerHomeComponent implements OnInit {

    displayedColumns = ['customerIdentifier', 'accountNumber', 'firstName', 'lastName', 'mobileNumber', 'email', 'fee', 'creationDate', 'editAccount'];
    dataSource = new MatTableDataSource(new Array<Account>());
    showEditSection: boolean = false;
    editAccountErrorMessage: string;
    editedAccount: Account = new Account();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) {}

    ngOnInit() {
        this.loadAllUsers();
        this.showEditSection = false;
    }

    private loadAllUsers() {
        this.loginService.getAllCustomerAccounts().subscribe(accounts => {
            let updatedArray = [];
            if (accounts && accounts.length > 0) {
                for (let i = 0; i < accounts.length; i++) {
                    let currentAccount = this.updateFee(JSON.parse(accounts[i]));
                    updatedArray.push(currentAccount);
                }
            }
            this.dataSource = new MatTableDataSource(updatedArray);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    getFee(currentAccount: any) {
        let accountCreatedDate = new Date(currentAccount.creationDate);
        let currDate = new Date();
        let timeDiff = Math.abs(currDate.getTime() - accountCreatedDate.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let monthsCompleted = Math.floor(diffDays / 30);
        let updatedMonthlyFee = monthsCompleted * 10;
        if (currentAccount.managerUpdatedFee) {
            updatedMonthlyFee = updatedMonthlyFee + currentAccount.managerUpdatedFee;
        }
        return updatedMonthlyFee;
    }

    updateFee(currentAccount: any) {
        let accountCreatedDate = new Date(currentAccount.creationDate);
        let updatedMonthlyFee = this.getFee(currentAccount);

        currentAccount.fee = updatedMonthlyFee;
        currentAccount.creationDate = new Date(accountCreatedDate.getUTCFullYear(), accountCreatedDate.getUTCMonth(),
            accountCreatedDate.getUTCDate()).toDateString();
        return currentAccount;
    }

    loadAccount(cid: string) {
        this.loginService.getCustomerAccountByCID(cid).subscribe(account => {
            if (account) {
                this.editedAccount = account;
                let updatedMonthlyFee = this.getFee(this.editedAccount);
                this.editedAccount.fee = updatedMonthlyFee;
                this.showEditSection = true;
            } else {
                this.showEditSection = false;
                this.editedAccount = new Account();
                this.editAccountErrorMessage = 'Unable to edit account';
            }
        });
    }

    updateAccount() {
        let useraccounts: any[] = JSON.parse(localStorage.getItem('useraccounts')) || [];
        let customerAccounts = [];
        localStorage.removeItem('useraccounts');

        if (useraccounts.length > 0) {
            for (let i = 0; i < useraccounts.length; i++) {
                let currAcc = JSON.parse(useraccounts[i]);
                if (currAcc.customerIdentifier == this.editedAccount.customerIdentifier) {
                    let pendingFee = this.getFee(this.editedAccount);
                    let managerUpdaedFee = this.editedAccount.fee;
                    let newFee = managerUpdaedFee - pendingFee;
                    this.editedAccount.managerUpdatedFee = this.editedAccount.managerUpdatedFee + newFee;
                    customerAccounts.push(JSON.stringify(this.editedAccount));
                } else {
                    customerAccounts.push(useraccounts[i]);
                }
            }
        }
        
        localStorage.setItem('useraccounts', JSON.stringify(customerAccounts));  
        this.loadAllUsers();
    }
}