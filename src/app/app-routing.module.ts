import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'associations', component: AssociationsListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
