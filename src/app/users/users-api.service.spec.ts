import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { UsersApiService } from './users-api.service';
import { UserListModel } from './models/user-list.model';
import { UserModel } from './models/user.model';
const apiBaseUrl = environment.apiBaseURL;

describe('UsersApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersApiService]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', inject([UsersApiService], (service: UsersApiService) => {
    expect(service).toBeTruthy();
  }));

  it('should get users by page number', inject([HttpTestingController, UsersApiService],
    (httpMock: HttpTestingController, service: UsersApiService) => {
      const fakeData: UserListModel = {
        data: [],
        page: 0,
        per_page: 0,
        total: 0,
        total_pages: 0,
      };
      const unsubscribe = service.getUsersByPageNumber(2).subscribe(data => {
        expect(data).toEqual(fakeData);
        unsubscribe.unsubscribe();
      });
      const req = httpMock.expectOne(`${apiBaseUrl}/users?page=2&delay=1`);
      expect(req.request.method).toEqual('GET');
      req.flush(fakeData);

      expect(service.getUsersByPageNumber()).toBeTruthy();
    }));

  it('should get users list count', inject([HttpTestingController, UsersApiService],
    (httpMock: HttpTestingController, service: UsersApiService) => {
      const fakeData: UserListModel = {
        data: [{ first_name: 'name', last_name: 'doe' }],
        page: 0,
        per_page: 0,
        total: 0,
        total_pages: 12,
      };
      const unsubscribe = service.getUserListRecordCount().subscribe(data => {
        expect(data).toEqual(fakeData.total_pages);
        unsubscribe.unsubscribe();
      });
      const req = httpMock.expectOne(`${apiBaseUrl}/users?per_page=1`);
      expect(req.request.method).toEqual('GET');
      req.flush(fakeData);
    }));


  it('should get full users list', inject([HttpTestingController, UsersApiService],
    (httpMock: HttpTestingController, service: UsersApiService) => {
      const fakeData: UserListModel = {
        data: [{ first_name: 'name', last_name: 'doe' }],
        page: 0,
        per_page: 0,
        total: 0,
        total_pages: 0,
      };
      const unsubscribe = service.getFullUserList(12).subscribe(data => {
        expect(data).toEqual(fakeData);
        unsubscribe.unsubscribe();
      });
      const req = httpMock.expectOne(`${apiBaseUrl}/users?per_page=12`);
      expect(req.request.method).toEqual('GET');
      req.flush(fakeData);
    }));

  it('should get specific user by id', inject([HttpTestingController, UsersApiService],
    (httpMock: HttpTestingController, service: UsersApiService) => {
      const fakeData: UserModel = { first_name: 'name', last_name: 'doe' };
      const id = 12;
      const unsubscribe = service.getUserById(id).subscribe(data => {
        expect(<any>data).toEqual(fakeData);
        unsubscribe.unsubscribe();
      });
      const req = httpMock.expectOne(`${apiBaseUrl}/users/${id}?delay=1`);
      expect(req.request.method).toEqual('GET');
      req.flush(fakeData);
      expect(service.getUserById()).toBeTruthy();
    }));


  it('should save user', inject([HttpTestingController, UsersApiService],
    (httpMock: HttpTestingController, service: UsersApiService) => {
      const fakeData: UserModel = { first_name: 'name', last_name: 'doe' };
      const unsubscribe = service.saveUser(fakeData).subscribe(data => {
        expect(<any>data).toEqual(fakeData);
        unsubscribe.unsubscribe();
      });
      const req = httpMock.expectOne(`${apiBaseUrl}/users?delay=3`);
      expect(req.request.method).toEqual('POST');
      req.flush(fakeData);
    }));

  it('should delete user', inject([HttpTestingController, UsersApiService],
    (httpMock: HttpTestingController, service: UsersApiService) => {
      const fakeData: UserModel = { first_name: 'name', last_name: 'doe' };
      const id = 12;
      const unsubscribe = service.deleteUser(id).subscribe(data => {
        expect(<any>data).toEqual(fakeData);
        unsubscribe.unsubscribe();
      });
      const req = httpMock.expectOne(`${apiBaseUrl}/users/${id}?delay=1`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(fakeData);
      expect(service.deleteUser()).toBeTruthy();
    }));


});

/* import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';

import { SessionApiService } from './session-api.service';

describe('SessionApiService', () => {
  const apiBaseUrl = environment.apiBaseURL;

  beforeEach(() => {
    localStorage.removeItem('session');
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionApiService]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', inject([SessionApiService], (service: SessionApiService) => {
    expect(service).toBeTruthy();
  }));

  it('should return sessionStatus empty ', inject([SessionApiService], (service: SessionApiService) => {
    expect(service.sessionStatus()).toEqual({ email: '', token: '' });
  }));

  it('should return sessionStatus with fake data ', inject([SessionApiService], (service: SessionApiService) => {
    spyOn(localStorage, 'getItem').and.returnValue(`{ "email": "fake", "token": "fake" }`);
    expect(service.sessionStatus()).toEqual({ email: 'fake', token: 'fake' });
  }));

  it('should log out', inject([SessionApiService], (service: SessionApiService) => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('session');
  }));

  it('should log in correctly', inject([HttpTestingController, SessionApiService],
    (httpMock: HttpTestingController, service: SessionApiService) => {
      const unsubscribe = service.login({ email: 'fake', password: 'fake' }).subscribe(data => {
        expect(data).toEqual({ email: 'fake', token: 'coolBeans' });
        unsubscribe.unsubscribe();
      });
      const req = httpMock.expectOne(`${apiBaseUrl}/login?delay=2`);
      expect(req.request.method).toEqual('POST');
      req.flush({ token: 'coolBeans' });
    }));

  it('should not log in correctly', inject([HttpTestingController, SessionApiService],
    (httpMock: HttpTestingController, service: SessionApiService) => {
      const unsubscribe = service.login({ email: 'fake', password: 'fake' }).subscribe(data => {
        expect(data).toEqual(null);
        unsubscribe.unsubscribe();
      });
      const req = httpMock.expectOne(`${apiBaseUrl}/login?delay=2`);
      expect(req.request.method).toEqual('POST');
      req.flush(null);
    }));

  it('should register correctly', inject([HttpTestingController, SessionApiService],
    (httpMock: HttpTestingController, service: SessionApiService) => {
      const unsubscribe = service.register({ email: 'fake', password: 'fake' }).subscribe(data => {
        expect(data.token).toEqual( 'coolBeans');
        unsubscribe.unsubscribe();
      });
      const req = httpMock.expectOne(`${apiBaseUrl}/register?delay=2`);
      expect(req.request.method).toEqual('POST');
      req.flush({ token: 'coolBeans' });
    }));

});
*/
