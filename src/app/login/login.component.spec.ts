import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SessionApiService } from '../session-api.service';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        const mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };
        const fakeSession = { email: 'fake', token: 'fake' };
        const mockSessionApiService = {
            sessionStatus: jasmine.createSpy().and.returnValue(fakeSession),
            login: jasmine.createSpy().and.returnValue(of({}))
        };
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule, FormsModule,
            ],
            declarations: [LoginComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: SessionApiService, useValue: mockSessionApiService },
                { provide: Router, useValue: mockRouter },

            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create record form', () => {
        expect(component).toBeTruthy();
        expect(component.recordForm).toBeTruthy();
        expect(component.recordForm.value).toEqual({ token: null, email: '', password: '' });
    });

    it('should log in successfully', () => {
        const router = TestBed.get(Router);
        const navigateSpy = router.navigate;
        expect(navigateSpy).toHaveBeenCalledTimes(0);
        component.login();
        expect(navigateSpy).toHaveBeenCalledWith(['']);
        expect(component.recordForm.value).toEqual({ token: null, email: '', password: '' });
    });

    it('should fail log in', () => {
        const sessionApi = TestBed.get(SessionApiService);
        sessionApi.login = jasmine.createSpy().and.returnValue(
            new Observable(subscriber => {
                subscriber.error('incorrect login');
            })
        );
        const router = TestBed.get(Router);
        const navigateSpy = router.navigate;
        expect(navigateSpy).toHaveBeenCalledTimes(0);
        component.login();
        expect(navigateSpy).not.toHaveBeenCalled();
        expect(component.recordForm.value).toEqual({ token: null, email: '', password: '' });
    });
});
