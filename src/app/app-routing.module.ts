import { Injectable, NgModule } from '@angular/core';
import { CanActivateChild, RouterModule, Routes, Router } from '@angular/router';
import { HomeWelcomeComponent } from './home-welcome/home-welcome.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';
import { SessionApiService } from './session-api.service';
import { RegisterComponent } from './shared/register/register.component';

@Injectable()
class HasAccess implements CanActivateChild {
  constructor(
    private router: Router,
    private sessionApi: SessionApiService
  ) { }

  canActivateChild(): boolean {
    const activeSession = this.sessionApi.sessionStatus();
    let canActivate = true;
    if (!activeSession || !activeSession.token) {
      this.router.navigate(['/login']);
      canActivate = false;
    }
    return canActivate;
  }
}

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: '/home'
      }, {
        path: 'home', pathMatch: 'full', component: HomeWelcomeComponent
      }, {
        path: 'users', loadChildren: '../app/users/users.module#UsersModule', canActivateChild: [HasAccess],
      }
    ]
  }, {
    path: 'login', pathMatch: 'full', component: LoginComponent
  }, {
    path: 'register', pathMatch: 'full', component: RegisterComponent
  }, {
    path: 'not_found', component: RouteNotFoundComponent
  }, {
    path: '**', redirectTo: '/not_found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [HasAccess]
})
export class AppRoutingModule { }

