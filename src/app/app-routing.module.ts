import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginPageComponent } from './login/login-page.component';
import { CreateComponent } from './create/create.component';
import { UsersComponent } from './users/users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:"", component: LoginPageComponent},
  {path:"register", component:RegisterComponent},
  {path:"create-user", component: CreateComponent, canActivate: [AuthGuard]},
  {path:"users", component:UsersComponent, canActivate: [AuthGuard]},
  {path:"update-user/:id", component:UpdateUserComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
