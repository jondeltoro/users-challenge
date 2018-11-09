import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SessionApiService } from './session-api.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeWelcomeComponent } from './home-welcome/home-welcome.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RouteNotFoundComponent,
    HomeWelcomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    SessionApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
