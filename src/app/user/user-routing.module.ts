import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FilesComponent } from './components/files/files.component';
import { MainComponent } from './pages/main/main.component';
import { FoldersComponent } from './pages/folders/folders.component';
import { UserComponent } from './pages/user/user.component';

const ROUTES:Routes = [
  {path: '',
  children:
  [
    {
      path:'home', component: HomeComponent,
      children:
      [
        {path:'files', component: FilesComponent},
        {path:'main', component: MainComponent},
        {path:'folders', component: FoldersComponent},
        {path:'user', component: UserComponent},

      ]
    },
    {path: '**', pathMatch:'full', redirectTo:'home'}
  ]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
