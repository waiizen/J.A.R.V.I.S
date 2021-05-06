import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PayslipComponent } from './payslip/payslip.component';
import { PayslipViewComponent } from './payslip-view/payslip-view.component';
import { PayslipService } from "./services/PayslipService";
import {RouterModule, Routes} from "@angular/router";
import { AuthComponent } from './auth/auth.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { HomeComponent } from './home/home.component';
import { PayslipSingleComponent } from './payslip-single/payslip-single.component';
import { PayslipFormComponent } from './payslip-form/payslip-form.component';
import {ReactiveFormsModule} from "@angular/forms";

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'payslip', component: PayslipViewComponent},
  { path: 'payslip/:id', component: PayslipFormComponent},
  { path: 'payslip/new', component: PayslipFormComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'not-found', component: FourOhFourComponent},
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PayslipComponent,
    PayslipViewComponent,
    AuthComponent,
    FourOhFourComponent,
    HomeComponent,
    PayslipSingleComponent,
    PayslipFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    PayslipService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
