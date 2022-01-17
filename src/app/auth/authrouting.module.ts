import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from './components/features/features.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactComponent } from './components/contact/contact.component';

const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,

        children: [
          {path:'features', component: FeaturesComponent},
          {path:'login', component: LoginComponent},
          {path:'signup', component: SignupComponent},
          {path:'contact', component: ContactComponent}
        ],
      },
      { path: '**', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AuthroutingModule {}
