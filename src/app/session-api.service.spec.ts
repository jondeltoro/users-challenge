import { TestBed, inject } from '@angular/core/testing';
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
