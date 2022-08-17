import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form.component';

//登入頁面
import { LoginComponent } from './login.component';

// router path
const routes: Routes = [
  {path:'',component:UsersComponent},
  {path:'add',component:UserFormComponent},
  {path:'add/:id',component:UserFormComponent},
  {path:'login',component:LoginComponent},
  {path:'login/:inValidLoginMessage',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
