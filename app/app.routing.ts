import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './account/createnewaccount.component';
import { HomeComponent } from './home/home.component';
import { ManagerHomeComponent } from './home/managerhome.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'createnewaccount', component: CreateAccountComponent },
    { path: 'home', component: HomeComponent },
    { path: 'managerhome', component: ManagerHomeComponent },    
    { path: '**', redirectTo: '' }// otherwise redirect to home
];

export const routing = RouterModule.forRoot(appRoutes);