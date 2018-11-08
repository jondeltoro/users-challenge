import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-not-found',
  templateUrl: './route-not-found.component.html',
  styleUrls: ['./route-not-found.component.scss']
})
export class RouteNotFoundComponent implements OnInit, OnDestroy {
  private timeoutHandler = null;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.timeoutHandler = setTimeout(() => this.router.navigate(['/']), 5000);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutHandler);
  }
}
