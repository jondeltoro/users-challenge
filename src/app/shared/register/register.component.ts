import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionApiService } from '../../session-api.service';
import { SessionModel } from '../../models/session.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {
  public recordForm: FormGroup;
  public saving = false;
  public saved = false;
  private savingSubscription = new Subscription();
  private timeoutHandler = null;

  constructor(
    private formBuilder: FormBuilder,
    private sessionApi: SessionApiService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.recordForm = this.formBuilder.group({
      token: null,
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.savingSubscription.unsubscribe();
    clearTimeout(this.timeoutHandler);
  }

  register() {
    const formValues = this.recordForm.value;
    const payload: SessionModel = {
      email: formValues.email,
      password: formValues.password,
    };
    this.saving = true;
    this.recordForm.disable();
    this.savingSubscription = this.sessionApi.register(payload).subscribe(res => {
      this.saved = true;
      this.recordForm.reset();
      this.timeoutHandler = setTimeout(() => this.redirect(), 2000);
      this.changeDetector.markForCheck();
    },
      error => {
        this.recordForm.enable();
        this.saving = false;
      }
    );
  }

  redirect() {
    const activePath = this.route.snapshot.pathFromRoot.map(o => o.url[0]).join('/');
    if (activePath.indexOf('/users/') >= 0) {
      this.router.navigate(['/users']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
