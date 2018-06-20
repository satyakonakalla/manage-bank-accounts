import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    cid: string = "test";
    password: string;
    loginErrMsg: string;

    constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) {

    }

    ngOnInit() {
        this.loginService.logout();        
    }

    authenticate() {
        this.loginErrMsg = '';
        this.loginService.login(this.cid, this.password)
            .subscribe(
            data => {
                 if(!data.isManagerAccount){
                     this.updateFee();
                     this.router.navigate(['/home']);
                 }else{
                     this.router.navigate(['/managerhome']);
                 }                
            },
            error => {
                this.loginErrMsg = error;
            });
    }

    updateFee(){
        let currentAccount = JSON.parse(localStorage.getItem('currentUser'));
        let accountCreatedDate = new Date(currentAccount.creationDate);
        let currDate = new Date();       
        let timeDiff = Math.abs(currDate.getTime() - accountCreatedDate.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        let monthsCompleted = Math.floor(diffDays/30);
        let updatedMonthlyFee = monthsCompleted * 10;
        currentAccount.monthlyFee = updatedMonthlyFee;
        localStorage.setItem('currentUser', JSON.stringify(currentAccount));
    }
        
}
