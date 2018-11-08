import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UsersApiService } from './users-api.service';
import { UsersListPaginationComponent } from './users-home/users-list-pagination/users-list-pagination.component';
import { SharedModule } from '../shared/shared.module';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersOpenProfileComponent } from './users-open-profile/users-open-profile.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [
    UsersHomeComponent,
    UsersCreateComponent,
    UsersListComponent,
    UsersListPaginationComponent,
    UsersCreateComponent,
    UsersListComponent,
    UsersOpenProfileComponent
  ],
  exports: [],
  providers: [UsersApiService]
})
export class UsersModule { }
