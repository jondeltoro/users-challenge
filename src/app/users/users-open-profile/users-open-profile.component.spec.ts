import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersOpenProfileComponent } from './users-open-profile.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UsersApiService } from '../users-api.service';

describe('UsersOpenProfileComponent', () => {
    let component: UsersOpenProfileComponent;
    let fixture: ComponentFixture<UsersOpenProfileComponent>;
    const mockUsersApiService = {
        getUserById: jasmine.createSpy().and.returnValue(of({ first_name: 'Jonathan' })),
    };

    const mockActivatedRoute = { snapshot: { params: { id: 2 } } };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UsersOpenProfileComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: UsersApiService, useValue: mockUsersApiService },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersOpenProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should call getUserById with id 2', () => {
        const usersApi = TestBed.get(UsersApiService);
        expect(usersApi.getUserById).toHaveBeenCalledWith(2);
    });
});

