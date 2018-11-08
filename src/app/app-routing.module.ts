import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  }, {
    path: 'users', loadChildren: '../app/users/users.module#UsersModule'
  }, {
    path: 'home', pathMatch: 'full', component: HomeComponent
  }, {
    path: 'login', pathMatch: 'full', component: LoginComponent
  }, {
    path: 'not_found', component: RouteNotFoundComponent
  }, {
    path: '**', redirectTo: '/not_found'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
