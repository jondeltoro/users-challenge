import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersApiService } from '../users-api.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-users-open-profile',
  templateUrl: './users-open-profile.component.html',
  styleUrls: ['./users-open-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersOpenProfileComponent implements OnInit, OnDestroy {
  public user: UserModel = null;
  private getUserSubscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private usersApi: UsersApiService,
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    this.getUserSubscription = this.usersApi.getUserById(userId).subscribe(({ data }: { data: UserModel }) => {
      this.user = data;
      this.changeDetector.markForCheck();
    });
  }
  ngOnDestroy() {
    this.getUserSubscription.unsubscribe();
  }
}
