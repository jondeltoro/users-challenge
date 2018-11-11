import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('Open root path', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should redirect to login page', () => {
    page.navigateToRoot();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/login');
  });
});
