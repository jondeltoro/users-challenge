import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouteNotFoundComponent } from './route-not-found.component';

describe('RouteNotFoundComponent', () => {
    let component: RouteNotFoundComponent;
    let fixture: ComponentFixture<RouteNotFoundComponent>;
    beforeEach(async(() => {
        const mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };
        TestBed.configureTestingModule({
            declarations: [RouteNotFoundComponent],
            providers: [
                { provide: Router, useValue: mockRouter },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RouteNotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should redirect to / after 5 seconds', fakeAsync(() => {
        const router = TestBed.get(Router);
        const navigateSpy = router.navigate;
        component.ngOnInit();
        tick(6000);
        fixture.detectChanges();
        expect(navigateSpy).toHaveBeenCalledWith(['/']);
    }));

});
