import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { SessionModel } from './models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionApiService {
  private readonly apiBaseUrl = environment.apiBaseURL;
  private session = {
    email: '',
    token: '',
  };

  constructor(
    private http: HttpClient,
  ) { }

  sessionStatus(): SessionModel {
    const savedSession = localStorage.getItem('session');
    if (savedSession) {
      this.session = JSON.parse(savedSession);
    }
    return this.session;
  }

  login(payload: SessionModel): Observable<SessionModel> {
    const saveStorage = (result: SessionModel) => {
      if (result && result.token) {
        this.session.email = payload.email;
        this.session.token = result.token;
        localStorage.setItem('session', JSON.stringify(this.session));
        return this.session;
      }
      return result;
    };
    return this.http.post(`${this.apiBaseUrl}/login?delay=2`, payload)
      .pipe(
        debounceTime(250),
        map((data: SessionModel) => saveStorage(data))
      );
  }

  register(payload: SessionModel): Observable<SessionModel> {
    return this.http.post(`${this.apiBaseUrl}/register?delay=2`, payload)
      .pipe(
        debounceTime(250),
        map((data: SessionModel) => data)
      );
  }

  logout() {
    this.session = { email: '', token: '' };
    localStorage.removeItem('session');
  }

}
