import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersApiService } from '../users-api.service';
import { UserListModel } from '../models/user-list.model';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnDestroy {
  private userListSubscription = new Subscription();
  private userDeleteSubscription = new Subscription();
  public loading = false;
  public userList: UserListModel = {
    data: [],
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
  };

  constructor(
    private usersApi: UsersApiService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUserListByPageNumber(1);
  }

  ngOnDestroy() {
    this.userListSubscription.unsubscribe();
    this.userDeleteSubscription.unsubscribe();
  }

  getUserListByPageNumber(page = 1) {
    this.userListSubscription.unsubscribe();
    this.loading = true;
    this.userListSubscription = this.usersApi.getUsersByPageNumber(page).subscribe(
      (userList: UserListModel) => {
        this.loading = false;
        this.userList = userList;
        this.changeDetector.markForCheck();
      },
      error => this.loading = false
    );
  }

  changePageHandler(page: number) {
    this.getUserListByPageNumber(page);
  }

  openUserProfile(user: UserModel) {
    this.router.navigate([`/users/view/${user.id}`]);
  }

  deleteUser(user: UserModel) {
    const conf = confirm(`Are you sure you want to delete this user: ${user.first_name} ${user.last_name}?`);
    if (conf) {
      this.loading = true;
      this.userDeleteSubscription.unsubscribe();
      this.userDeleteSubscription = this.usersApi.deleteUser(user.id).subscribe(
        () => {
          this.userList.data = this.userList.data.filter(storedUser => storedUser !== user);
          this.loading = false;
          this.changeDetector.markForCheck();
        },
        () => this.loading = false
      );
    }
  }

}
