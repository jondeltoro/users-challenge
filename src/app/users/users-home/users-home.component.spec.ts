import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UsersHomeComponent } from './users-home.component';

describe('UsersHomeComponent', () => {
    let component: UsersHomeComponent;
    let fixture: ComponentFixture<UsersHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UsersHomeComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
