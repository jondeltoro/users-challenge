import { browser, by, element } from 'protractor';

const EMAIL = 'jonathan@test.com';
const PASSWORD = 'test123';

export class RegisterPage {
  navigateToRegister() {
    return browser.get('/register');
  }

  navigateToUsersRegister() {
    return browser.get('/users/register');
  }

  getRegisterComponentElement() {
    return element(by.css('app-root app-register'));
  }

  getRegisterButtonElement() {
    return this.getRegisterComponentElement().$('button.register');
  }

  getCancelButtonElement() {
    return this.getRegisterComponentElement().$('button.cancel');
  }

  getEmailInputElement() {
    return this.getRegisterComponentElement().$('input[name=email]');
  }

  getPasswordInputElement() {
    return this.getRegisterComponentElement().$('input[name=password]');
  }

  getSuccessMessageElement() {
    return this.getRegisterComponentElement().$('div.alert-success');
  }

  setEmail(email = EMAIL) {
    this.getEmailInputElement().sendKeys(email);
  }

  setPassword(password = PASSWORD) {
    this.getPasswordInputElement().sendKeys(password);
  }

  clickRegisterButton() {
    this.getRegisterButtonElement().click();
  }

  clickCancelButton() {
    this.getCancelButtonElement().click();
  }

  register(email = EMAIL, password = PASSWORD) {
    this.setEmail(email);
    this.setPassword(password);
    this.clickRegisterButton();
  }

}
