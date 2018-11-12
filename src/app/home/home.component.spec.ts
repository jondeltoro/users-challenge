import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { SessionApiService } from '../session-api.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let fakeSession = null;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const createComponent = () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    fakeSession = { email: 'fake', token: 'fake' };
    const mockSessionApiService = {
      sessionStatus: () => fakeSession,
      logout: jasmine.createSpy('logout')
    };
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HomeComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SessionApiService, useValue: mockSessionApiService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = null;
    component = null;
  });

  it('should not redirect to login', () => {
    createComponent();
    expect(component).toBeTruthy();

  });

  it('should redirect to login', () => {
    fakeSession.token = null;
    createComponent();
    const router = TestBed.get(Router);
    const navigateSpy = router.navigate;
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should call logout service and redirect to /login when calling logout method', () => {
    createComponent();
    const router = TestBed.get(Router);
    const sessionApi = TestBed.get(SessionApiService);
    const logoutSpy = sessionApi.logout;
    const navigateSpy = router.navigate;
    component.logout();
    expect(logoutSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

});
