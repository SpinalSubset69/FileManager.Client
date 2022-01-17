import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthroutingModule } from './authrouting.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FeaturesComponent } from './components/features/features.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    HomeComponent,
    FeaturesComponent,
    LoginComponent,
    SignupComponent,
    ContactComponent
  ],
  imports: [
    CommonModule   ,
    AuthroutingModule,
    SharedModule,
    FormsModule,
    NgxSpinnerModule,
    RouterModule
  ]
})
export class AuthModule { }
