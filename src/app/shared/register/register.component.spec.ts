import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { SessionApiService } from '../../session-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    beforeEach(async(() => {
        const fakeSession = { email: 'fake', token: 'fake' };
        const mockSessionApiService = {
            sessionStatus: jasmine.createSpy().and.returnValue(fakeSession),
            register: jasmine.createSpy().and.returnValue(of({}))
        };
        const mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };
        const mockActivatedRoute = { snapshot: { pathFromRoot: [{ url: ['/register/'] }] } };
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule, FormsModule,
            ],
            providers: [
                { provide: SessionApiService, useValue: mockSessionApiService },
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [RegisterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create record form', () => {
        expect(component).toBeTruthy();
        expect(component.recordForm).toBeTruthy();
        expect(component.recordForm.value).toEqual({ token: null, email: '', password: '' });
    });

    it('should register new user and redirect to /login', fakeAsync(() => {
        const router = TestBed.get(Router);
        const navigateSpy = router.navigate;
        expect(navigateSpy).toHaveBeenCalledTimes(0);
        expect(component.recordForm.value).toEqual({ token: null, email: '', password: '' });
        component.register();
        expect(component.recordForm.value).toEqual({ token: null, email: null, password: null });
        tick(3000);
        expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    }));

    it('should register new user and redirect to /users', fakeAsync(() => {
        const fakeRoute = TestBed.get(ActivatedRoute);
        fakeRoute.snapshot.pathFromRoot[0].url[0] = '/users/';
        const router = TestBed.get(Router);
        const navigateSpy = router.navigate;
        expect(navigateSpy).toHaveBeenCalledTimes(0);
        expect(component.recordForm.value).toEqual({ token: null, email: '', password: '' });
        component.register();
        expect(component.recordForm.value).toEqual({ token: null, email: null, password: null });
        tick(3000);
        expect(navigateSpy).toHaveBeenCalledWith(['/users']);
    }));

    it('should fail to register', () => {
        const sessionApi = TestBed.get(SessionApiService);
        sessionApi.register = jasmine.createSpy().and.returnValue(
            new Observable(subscriber => {
                subscriber.error('incorrect data');
            })
        );
        const router = TestBed.get(Router);
        const navigateSpy = router.navigate;
        expect(navigateSpy).toHaveBeenCalledTimes(0);
        component.register();
        expect(navigateSpy).not.toHaveBeenCalled();
        expect(component.recordForm.value).toEqual({ token: null, email: '', password: '' });
    });
});
