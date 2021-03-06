import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PayslipComponent } from './payslipApp/payslip/payslip.component';
import { PayslipService } from "./services/PayslipService";
import {RouterModule, Routes} from "@angular/router";
import { AuthComponent } from './auth/auth.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { HomeComponent } from './home/home.component';
import { PayslipSingleComponent } from './payslipApp/payslip-single/payslip-single.component';
import { PayslipFormComponent } from './payslipApp/payslip-form/payslip-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from '@angular/material/select';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {MatTooltipModule} from "@angular/material/tooltip";
import { IdComponent } from './idApp/id/id.component';
import { IdFormComponent } from './idApp/id-form/id-form.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import { AdminAppComponent } from './admin-app/admin-app.component';
import {PopupAddCategory} from "./admin-app/pop-up/popup-add-category";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { ResellAppComponent } from './resell-app/resell-app.component';
import {PopupAddVinted} from "./resell-app/popup/popup-add-vinted";

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'payslip', canActivate: [AuthGuardService], component: PayslipComponent},
  { path: 'payslip/view/:id', canActivate: [AuthGuardService], component: PayslipSingleComponent},
  { path: 'payslip/new', canActivate: [AuthGuardService], component: PayslipFormComponent},
  { path: 'ids', canActivate: [AuthGuardService], component: IdComponent},
  { path: 'ids/new', canActivate: [AuthGuardService], component: IdFormComponent},
  { path: 'admin', canActivate: [AuthGuardService], component: AdminAppComponent},
  { path: 'resell', canActivate: [AuthGuardService], component: ResellAppComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'not-found', component: FourOhFourComponent},
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PayslipComponent,
    AuthComponent,
    FourOhFourComponent,
    HomeComponent,
    PayslipSingleComponent,
    PayslipFormComponent,
    SignupComponent,
    SigninComponent,
    IdComponent,
    IdFormComponent,
    AdminAppComponent,
    PopupAddCategory,
    ResellAppComponent,
    PopupAddVinted
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    PdfViewerModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    PayslipService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
