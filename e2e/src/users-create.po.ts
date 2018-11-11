import { browser, by, element } from 'protractor';

const FIRST_NAME = 'jonathan';
const LAST_NAME = 'test123';

export class UsersCreatePage {
  navigateToUsersCreate() {
    return browser.get('/users/create');
  }

  getUserCreateComponentElement() {
    return element(by.css('app-root app-users-create'));
  }

  getSaveButtonElement() {
    return this.getUserCreateComponentElement().$('button.save');
  }

  getCancelButtonElement() {
    return this.getUserCreateComponentElement().$('button.cancel');
  }

  getFirstNameInputElement() {
    return this.getUserCreateComponentElement().$('input[name=firstName]');
  }

  getLastNameInputElement() {
    return this.getUserCreateComponentElement().$('input[name=lastName]');
  }

  getSuccessMessageElement() {
    return this.getUserCreateComponentElement().$('div.alert-success');
  }

  setFirstName(firstName = FIRST_NAME) {
    this.getFirstNameInputElement().sendKeys(firstName);
  }

  setLastName(lastName = LAST_NAME) {
    this.getLastNameInputElement().sendKeys(lastName);
  }

  getFirstName() {
    return this.getFirstNameInputElement().getAttribute('value');
  }

  getLastName() {
    return this.getLastNameInputElement().getAttribute('value');
  }

  clickSaveButton() {
    this.getSaveButtonElement().click();
  }

  clickCancelButton() {
    this.getCancelButtonElement().click();
  }

  createUser(firstName = FIRST_NAME, lastName = LAST_NAME) {
    this.setFirstName(firstName);
    this.setLastName(lastName);
    this.clickSaveButton();
  }

}
