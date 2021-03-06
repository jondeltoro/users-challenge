import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersOpenProfileComponent } from './users-open-profile/users-open-profile.component';
import { RegisterComponent } from '../shared/register/register.component';

const routes: Routes = [
  {
    path: '', component: UsersHomeComponent, children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'list'
      }, {
        path: 'list', pathMatch: 'full', component: UsersListComponent
      }, {
        path: 'search', pathMatch: 'full', component: UsersListComponent, data: { searchMode: true }
      }, {
        path: 'register', pathMatch: 'full', component: RegisterComponent
      }, {
        path: 'create', pathMatch: 'full', component: UsersCreateComponent
      }, {
        path: 'view/:id', pathMatch: 'full', component: UsersOpenProfileComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
