import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { UsersListPaginationComponent } from './users-list-pagination.component';

describe('UsersListPaginationComponent', () => {
    let component: UsersListPaginationComponent;
    let fixture: ComponentFixture<UsersListPaginationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UsersListPaginationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersListPaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return an array with [1, 2, 3, 4, 5]', () => {
        expect(component.generateArray(5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should change page', fakeAsync(() => {
        component.selectPage(0);
        component.changePage.subscribe(data => {
            expect(data).toEqual(5);
        });
        expect(component.selectPage(5)).toBeUndefined();
    }));

    it('should go next page', fakeAsync(() => {
        component.currentPage = 4;
        component.totalPages = 5;
        component.changePage.subscribe(data => {
            expect(data).toEqual(5);
        });
        component.nextPage();
    }));

    it('should not go next page', fakeAsync(() => {
        component.currentPage = 5;
        component.totalPages = 5;
        const spy = spyOn(component, 'changePage');
        component.nextPage();
        expect(spy).not.toHaveBeenCalled();
    }));

    it('should go prev page', fakeAsync(() => {
        component.currentPage = 2;
        component.totalPages = 5;
        component.changePage.subscribe(data => {
            expect(data).toEqual(1);
        });
        component.prevPage();
    }));

    it('should not go next prev', fakeAsync(() => {
        component.currentPage = 1;
        component.totalPages = 5;
        const spy = spyOn(component, 'changePage');
        component.prevPage();
        expect(spy).not.toHaveBeenCalled();
    }));


});
