import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './guards/authguard.guard';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)},
  {path:'user', loadChildren: () => import('./user/user.module').then(module => module.UserModule), canActivate: [AuthguardGuard]},
  {path:'**', pathMatch:'full', redirectTo:'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
