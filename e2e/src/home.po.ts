import { browser, by, element } from 'protractor';

export class HomePage {
  navigateToHome() {
    return browser.get('/home');
  }

  getHomeComponentElement() {
    return element(by.css('app-root app-home'));
  }

  getHomeButtonElement() {
    return this.getHomeComponentElement().$('li.home');
  }

  getUsersButtonElement() {
    return this.getHomeComponentElement().$('li.users');
  }

  getLogoutButtonElement() {
    return this.getHomeComponentElement().$('li.logout');
  }

  isHomeButtonActive() {
    return this.getHomeButtonElement().getAttribute('class').then((classes: string) => classes.indexOf('active') >= 0);
  }

  isUsersButtonActive() {
    return this.getUsersButtonElement().getAttribute('class').then((classes: string) => classes.indexOf('active') >= 0);
  }

  clickHomeButton() {
    this.getHomeButtonElement().$('a').click();
  }

  clickUsersButton() {
    this.getUsersButtonElement().$('a').click();
  }

  clickLogoutButton() {
    this.getLogoutButtonElement().$('a').click();
  }

}
