
import { LoginPage } from './login.po';
import { UsersListPage } from './users-list.po';
import { browser, ExpectedConditions as EC } from 'protractor';

describe('Search users page', () => {
  let usersListPage: UsersListPage;
  const totalPages = 1;
  const totalUsers = 12;
  const usersPerPage = 12;
  const keyword = 'George';

  beforeEach(() => {
    (new LoginPage()).LogInToApp();
    usersListPage = new UsersListPage();
    usersListPage.navigateToUsersSearch();
    browser.wait(EC.presenceOf(usersListPage.getPaginationPageElements().first()), 5000);
  });

  it(`should find 2 users named ${keyword}`, () => {
    usersListPage.searchKeyword(keyword);
    expect(usersListPage.getTableRowsCount()).toBe(2);
  });

  it(`should display ${usersPerPage} users, ${totalPages} pages, active page 1 and total number of users (${totalUsers})`, () => {
    expect(usersListPage.getTableRowsCount()).toBe(usersPerPage);
    expect(usersListPage.getPaginationPageCount()).toBe(totalPages);
    expect(usersListPage.getTotalRecords()).toBe(totalUsers);
    expect(usersListPage.getActivePageNumber()).toBe(1);
  });

  it('should have a Pagination element working as expected', () => {
    expect(usersListPage.isPaginationPrevButtonEnabled()).toBe(false);
    expect(usersListPage.isPaginationNextButtonEnabled()).toBe(false);
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
