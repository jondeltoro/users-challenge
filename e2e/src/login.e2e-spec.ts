import { LoginPage } from './login.po';
import { browser } from 'protractor';

describe('Login page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateToLogIn();
  });

  it('should show "Please log in!" text', () => {
    const loginHeaderElement = page.getHeaderElement();
    expect(loginHeaderElement.getText()).toEqual('Please log in!');
  });

  it('should enable "Log in" button when email and password reqs are met', () => {
    const loginButtonElement = page.getLogInButtonElement();
    expect(loginButtonElement.isEnabled()).toBe(false);
    page.setEmail('jonathan@test.com');
    expect(loginButtonElement.isEnabled()).toBe(false);
    page.setPassword('test123');
    expect(loginButtonElement.isEnabled()).toBe(true);
  });

  it('should redirect to /home if log in is successful', () => {
    page.logIn();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/home');
  });

  it('should redirect to /register when clicking on register button ', () => {
    page.clickRegisterButton();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/register');
  });

});
