import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SessionApiService } from '../session-api.service';

@Component({
  selector: 'app-home-welcome',
  templateUrl: './home-welcome.component.html',
  styleUrls: ['./home-welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeWelcomeComponent implements OnInit {
  public session = null;
  constructor(
    private sessionApi: SessionApiService
  ) { }

  ngOnInit() {
    this.session = this.sessionApi.sessionStatus();
  }

}
