import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule }    from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatButtonModule, MatButtonToggleModule, MatInputModule, 
    MatCardModule, MatListModule, MatCheckboxModule, MatTableModule, MatPaginatorModule,
    MatSortModule  }    from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './account/createnewaccount.component';

import { fakeBackendProvider } from './backendservice/fake-backend';
import { LoginService } from './services/login.service';
import { HomeComponent } from './home/home.component';
import { ManagerHomeComponent } from './home/managerhome.component';



@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        MatFormFieldModule, MatButtonModule, MatButtonToggleModule, MatInputModule, MatCardModule, 
        MatListModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        CreateAccountComponent,
        HomeComponent,
        ManagerHomeComponent
    ],    
    providers: [
        fakeBackendProvider, LoginService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }