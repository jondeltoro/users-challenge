import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToRoot() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root app-login h2')).getText();
  }
}
