import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionApiService } from '../session-api.service';
import { SessionModel } from '../models/session.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  public recordForm: FormGroup;
  public loggingIn = false;
  private loggingInSubscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private sessionApi: SessionApiService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit() {
    this.recordForm = this.formBuilder.group({
      token: null,
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.loggingInSubscription.unsubscribe();
  }

  login() {
    const formValues = this.recordForm.value;
    const payload: SessionModel = {
      email: formValues.email,
      password: formValues.password,
    };
    this.loggingIn = true;
    this.recordForm.disable();
    this.loggingInSubscription = this.sessionApi.login(payload).subscribe(res => {
      this.loggingIn = false;
      this.recordForm.enable();
      this.router.navigate(['']);
      this.changeDetector.markForCheck();
    },
      error => {
        this.recordForm.enable();
        this.loggingIn = false;
      }
    );
  }

}
