import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form.component';

// router path
const routes: Routes = [
  {path:'',component:UsersComponent},
  {path:'add',component:UserFormComponent},
  {path:'add/:id',component:UserFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
