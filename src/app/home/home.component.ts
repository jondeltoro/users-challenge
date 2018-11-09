import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionApiService } from '../session-api.service';
import { SessionModel } from '../models/session.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private activeSession: SessionModel = null;

  constructor(
    private router: Router,
    private sessionApi: SessionApiService,
  ) {
    this.activeSession = sessionApi.sessionStatus();
    if (!this.activeSession || !this.activeSession.token) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

  logout() {
    this.sessionApi.logout();
    this.router.navigate(['/login']);
  }
}
