import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { retry, debounceTime, map } from 'rxjs/operators';
import { UserModel } from './models/user.model';
import { UserListModel } from './models/user-list.model';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private readonly apiBaseUrl = environment.apiBaseURL;

  constructor(
    private http: HttpClient
  ) { }

  getUsersByPageNumber(page = 1): Observable<UserListModel> {
    return this.http.get(`${this.apiBaseUrl}/users?page=${page}&delay=1`)
      .pipe(
        retry(3),
        debounceTime(250),
        map((data: UserListModel) => data)
      );
  }

  getUserById(id = 0): Observable<{ data: UserModel }> {
    return this.http.get(`${this.apiBaseUrl}/users/${id}?delay=1`)
      .pipe(
        retry(3),
        debounceTime(250),
        map((data: { data: UserModel }) => data)
      );
  }

  saveUser(payload: UserModel): Observable<UserModel> {
    return this.http.post(`${this.apiBaseUrl}/users?delay=3`, payload)
      .pipe(
        retry(3),
        debounceTime(250),
        map((data: UserModel) => data)
      );
  }

  deleteUser(id = 0): Observable<UserModel> {
    return this.http.delete(`${this.apiBaseUrl}/users/${id}?delay=1`)
      .pipe(
        retry(3),
        debounceTime(250),
        map((data: any) => data)
      );
  }

}
