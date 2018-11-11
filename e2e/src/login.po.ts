import { browser, by, element, ExpectedConditions as EC } from 'protractor';

const EMAIL = 'jonathan@test.com';
const PASSWORD = 'test123';

export class LoginPage {
  navigateToLogIn() {
    return browser.get('/login');
  }

  getLoginComponentElement() {
    return element(by.css('app-root app-login'));
  }

  getHeaderElement() {
    return element(by.css('app-root app-login h2'));
  }

  getLogInButtonElement() {
    return this.getLoginComponentElement().$('button.log-in');
  }

  getRegisterButtonElement() {
    return this.getLoginComponentElement().$('button.register');
  }

  getEmailInputElement() {
    return this.getLoginComponentElement().$('input[name=email]');
  }

  getPasswordInputElement() {
    return this.getLoginComponentElement().$('input[name=password]');
  }

  setEmail(email = EMAIL) {
    this.getEmailInputElement().sendKeys(email);
  }

  setPassword(password = PASSWORD) {
    this.getPasswordInputElement().sendKeys(password);
  }

  clickLogInButton() {
    this.getLogInButtonElement().click();
  }

  clickRegisterButton() {
    this.getRegisterButtonElement().click();
  }

  logIn(email = EMAIL, password = PASSWORD) {
    this.setEmail(email);
    this.setPassword(password);
    this.clickLogInButton();
  }

  LogInToApp() {
    this.navigateToLogIn();
    this.logIn();
    browser.wait(EC.urlIs(browser.baseUrl + '/home'), 2500);
  }
}
