import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { SessionApiService } from './session-api.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(
    private sessionApi: SessionApiService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const activeSession = this.sessionApi.sessionStatus();
    let authReq = req;
    if (activeSession && activeSession.token) {
      authReq = req.clone({
        setHeaders: { 'Authorization': 'Bearer ' + activeSession.token }
      });
    }
    return next.handle(authReq);
  }

}
