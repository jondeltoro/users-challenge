import { browser, ExpectedConditions as EC } from 'protractor';
import { HomePage } from './home.po';
import { LoginPage } from './login.po';

describe('Home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    (new LoginPage()).LogInToApp();
    page.navigateToHome();
  });

  it('should have the home button active', () => {
    expect( page.isHomeButtonActive()).toBe(true);
  });

  it('should should redirect to /users/list when clicking Users button', () => {
    page.clickUsersButton();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/users/list');
    expect( page.isHomeButtonActive()).toBe(false);
    expect( page.isUsersButtonActive()).toBe(true);
  });

  it('should should redirect to /login when clicking logout button', () => {
    page.clickLogoutButton();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');
  });

});
