import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
