import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersCreateComponent } from './users-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersApiService } from '../users-api.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('UsersCreateComponent', () => {
    let component: UsersCreateComponent;
    let fixture: ComponentFixture<UsersCreateComponent>;

    beforeEach(async(() => {
        const mockUsersApiService = {
            saveUser: jasmine.createSpy().and.returnValue(of({ first_name: 'Jonathan' })),
        };
        const mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };
        TestBed.configureTestingModule({
            declarations: [UsersCreateComponent],
            imports: [
                ReactiveFormsModule, FormsModule,
            ],
            providers: [
                { provide: UsersApiService, useValue: mockUsersApiService },
                { provide: Router, useValue: mockRouter },

            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.cancel()).toBeUndefined();
        expect(component.save()).toBeUndefined();
    });
});
