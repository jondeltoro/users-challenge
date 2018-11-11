import { browser, by, element, protractor } from 'protractor';

export class UsersListPage {
  navigateToUsersList() {
    return browser.get('/users/list');
  }

  navigateToUsersSearch() {
    return browser.get('/users/search');
  }

  getUsersListComponentElement() {
    return element(by.css('app-root app-users-list'));
  }

  getTotalRecordsElement() {
    return this.getUsersListComponentElement().$('table > caption');
  }

  getTableRowsElements() {
    return this.getUsersListComponentElement().$$('table > tbody > tr');
  }

  getPaginationPrevButtonElement() {
    return this.getUsersListComponentElement().$('app-users-list-pagination li.prev');
  }

  getPaginationNextButtonElement() {
    return this.getUsersListComponentElement().$('app-users-list-pagination li.next');
  }

  getPaginationPageElements() {
    return this.getUsersListComponentElement().$$('app-users-list-pagination li.page-number > a');
  }

  getPaginationActivePageElement() {
    return this.getUsersListComponentElement().$('app-users-list-pagination li.page-number.active > a');
  }

  getSearchInputElement() {
    return this.getUsersListComponentElement().$('input[name="search"]');
  }

  getTableRowsCount() {
    return this.getTableRowsElements().count();
  }

  getPaginationPageCount() {
    return this.getPaginationPageElements().count();
  }

  getTotalRecords() {
    return this.getTotalRecordsElement().getText().then((text: string) => {
      let total = 0;
      const matches = text.match(/^Total Records (\d.*)$/);
      if (matches) {
        total = parseInt(matches[1], 10);
      }
      return total;
    });
  }

  getActivePageNumber() {
    return this.getPaginationActivePageElement().getText().then((pageNumber: string) => parseInt(pageNumber, 10));
  }

  isPaginationPrevButtonEnabled() {
    return this.getPaginationPrevButtonElement().getAttribute('class').then((classes: string) => classes.indexOf('disabled') < 0);
  }

  isPaginationNextButtonEnabled() {
    return this.getPaginationNextButtonElement().getAttribute('class').then((classes: string) => classes.indexOf('disabled') < 0);
  }

  goNextPage() {
    return this.getPaginationNextButtonElement().$('a').click();
  }

  goPrevPage() {
    return this.getPaginationPrevButtonElement().$('a').click();
  }

  goPageNumber(pageNumber = 1) {
    return this.getPaginationPageElements().get(pageNumber - 1).click();
  }

  removeUser(userNumber = 1) {
    return this.getTableRowsElements().get(userNumber - 1).$('[title="Delete User"]').click().then(() => {
      const confirmAction = browser.switchTo().alert();
      confirmAction.accept();
    });
  }

  viewUser(userNumber = 1) {
    return this.getTableRowsElements().get(userNumber - 1).$('[title="View User"]').click();
  }

  searchKeyword(keyword = '') {
    return this.getSearchInputElement().sendKeys(keyword);
  }
}
