import { LoginPage } from './login.po';
import { UsersListPage } from './users-list.po';
import { browser, ExpectedConditions as EC } from 'protractor';

describe('User list page', () => {
  let usersListPage: UsersListPage;
  const totalPages = 4;
  const totalUsers = 12;
  const usersPerPage = 3;

  beforeEach(() => {
    (new LoginPage()).LogInToApp();
    usersListPage = new UsersListPage();
    usersListPage.navigateToUsersList();
    browser.wait(EC.presenceOf(usersListPage.getPaginationPageElements().first()), 5000);
  });

  it(`should display ${usersPerPage} users, ${totalPages} pages, active page 1 and total number of users (${totalUsers})`, () => {
    expect(usersListPage.getTableRowsCount()).toBe(usersPerPage);
    expect(usersListPage.getPaginationPageCount()).toBe(totalPages);
    expect(usersListPage.getTotalRecords()).toBe(totalUsers);
    expect(usersListPage.getActivePageNumber()).toBe(1);
  });

  it('should have a Pagination element working as expected', () => {
    expect(usersListPage.isPaginationPrevButtonEnabled()).toBe(false);
    expect(usersListPage.isPaginationNextButtonEnabled()).toBe(true);

    usersListPage.goPageNumber(4);
    expect(usersListPage.isPaginationPrevButtonEnabled()).toBe(true);
    expect(usersListPage.isPaginationNextButtonEnabled()).toBe(false);

    usersListPage.goPrevPage();
    expect(usersListPage.isPaginationPrevButtonEnabled()).toBe(true);
    expect(usersListPage.isPaginationNextButtonEnabled()).toBe(true);
    expect(usersListPage.getActivePageNumber()).toBe(3);
  });


  it('should remove users when clicking on the delete button and confirming the action', () => {
    expect(usersListPage.getTotalRecords()).toBe(totalUsers);
    usersListPage.removeUser(1);
    expect(usersListPage.getTotalRecords()).toBe(totalUsers - 1);
  });

  it('should redirect to /users/view/2 when clicking on the view user icon of the first row', () => {
    usersListPage.viewUser(2);
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/users/view/2');
  });

});
