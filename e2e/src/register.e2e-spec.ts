import { RegisterPage } from './register.po';
import { browser, ExpectedConditions as EC } from 'protractor';

describe('Registration page', () => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
    page.navigateToRegister();
  });

  it('should enable "Register" button when email and password reqs are met', () => {
    const registerButtonElement = page.getRegisterButtonElement();
    expect(registerButtonElement.isEnabled()).toBe(false);
    page.setEmail('jonathan@test.com');
    expect(registerButtonElement.isEnabled()).toBe(false);
    page.setPassword('test123');
    expect(registerButtonElement.isEnabled()).toBe(true);
  });

  it('should display success message and then redirect to /login when registering is successful', () => {
    page.register();
    expect(page.getSuccessMessageElement().getText()).toEqual('Record saved successfully, redirecting in a few seconds!');
    browser.wait(EC.urlIs(browser.baseUrl + '/login'), 2500);
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');
  });

  it('should redirect to /login when clicking on cancel button', () => {
    page.clickCancelButton();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');
  });

});
