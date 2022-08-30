import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form.component';

//登入頁面
import { LoginComponent } from './login.component';
//註冊頁面
import { SignupComponent } from './signup/signup.component';
//route守護機制
import { AuthGuard } from './auth.guard';

// router path
const routes: Routes = [
  // route guard 只應用於主頁面，新增和編輯使用者頁面
  {path:'',component:UsersComponent,canActivate:[AuthGuard]},
  {path:'add',component:UserFormComponent,canActivate:[AuthGuard]},
  {path:'add/:id',component:UserFormComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'login/:inValidLoginMessage',component:LoginComponent},
  {path:'signup',component:SignupComponent },
  {path:'signup/:inValidLoginMessage',component:SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
