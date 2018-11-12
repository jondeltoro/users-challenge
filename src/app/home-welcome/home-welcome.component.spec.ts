import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeWelcomeComponent } from './home-welcome.component';
import { SessionApiService } from '../session-api.service';

describe('HomeWelcomeComponent', () => {
    let component: HomeWelcomeComponent;
    let fixture: ComponentFixture<HomeWelcomeComponent>;
    const fakeSession = { email: 'fake', token: 'fake' };
    const mockSessionApiService = {
        sessionStatus: jasmine.createSpy().and.returnValue(fakeSession),
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeWelcomeComponent],
            providers: [
                { provide: SessionApiService, useValue: mockSessionApiService },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeWelcomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should say Welcome Home ${fakeSession.email}!`, () => {
        const sessionApi = TestBed.get(SessionApiService);
        const sessionStatusSpy = sessionApi.sessionStatus;
        expect(sessionStatusSpy).toHaveBeenCalled();
        expect(fixture.nativeElement.querySelector('div').innerHTML).toBe(`Welcome Home ${fakeSession.email}!`);
    });
});
