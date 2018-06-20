import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>                        
                </button>
                <a class="navbar-brand" href="#">ABC Bank Ltd.</a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                <li class="active"></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                <li><a [routerLink]="['/login']" ><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div>
    <router-outlet></router-outlet>
        
    </div>`
})

export class AppComponent { }