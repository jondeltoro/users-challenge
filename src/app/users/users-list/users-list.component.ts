import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
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
  private userSearchSubscription = new Subscription();
  public loading = false;
  public searchMode = false;
  public searchInput: FormControl = new FormControl();
  public searchText = '';

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
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data && data.searchMode) {
      this.searchMode = true;
    }
    if (this.searchMode) {
      this.getFullUserList();
    } else {
      this.getUserListByPageNumber(1);
    }
    this.userSearchSubscription = this.searchInput.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      map((keyword: string) => {
        return keyword.toLowerCase();
      })
    ).subscribe(keyword => {
      this.searchText = keyword;
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy() {
    this.userListSubscription.unsubscribe();
    this.userDeleteSubscription.unsubscribe();
    this.userSearchSubscription.unsubscribe();
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

  getFullUserList() {
    this.userListSubscription.unsubscribe();
    this.loading = true;
    const errorHandler = () => this.loading = false;
    const pullFullList = (count: number) => {
      this.userListSubscription = this.usersApi.getFullUserList(count).subscribe(
        (userList: UserListModel) => {
          this.loading = false;
          this.userList = userList;
          this.changeDetector.markForCheck();
        },
        errorHandler
      );
    };
    this.userListSubscription = this.usersApi.getUserListRecordCount().subscribe(pullFullList, errorHandler);
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
          this.userList.total--;
          this.loading = false;
          this.changeDetector.markForCheck();
        },
        () => this.loading = false
      );
    }
  }

  filter(users: UserModel[]) {
    const keyword = this.searchText;
    if (keyword) {
      return users.filter(user => (user.first_name.toLocaleLowerCase().indexOf(keyword) >= 0
        || user.last_name.toLocaleLowerCase().indexOf(keyword) >= 0));
    }
    return users;
  }
}
