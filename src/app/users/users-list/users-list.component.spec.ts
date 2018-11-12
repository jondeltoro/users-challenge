import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { UsersListComponent } from './users-list.component';
import { UsersApiService } from '../users-api.service';

describe('UsersListComponent', () => {
    let component: UsersListComponent;
    let fixture: ComponentFixture<UsersListComponent>;

    beforeEach(async(() => {
        const mockUsersApiService = {
            getUsersByPageNumber: jasmine.createSpy().and.returnValue(of({ first_name: 'Jonathan' })),
        };
        const mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };
        const mockActivatedRoute = { snapshot: { pathFromRoot: [{ url: ['/register/'] }] } };
        TestBed.configureTestingModule({
            declarations: [UsersListComponent],
            imports: [
                ReactiveFormsModule, FormsModule,
            ],
            providers: [
                { provide: UsersApiService, useValue: mockUsersApiService },
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

