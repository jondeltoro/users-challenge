import { browser, ExpectedConditions as EC } from 'protractor';
import { UsersCreatePage } from './users-create.po';
import { LoginPage } from './login.po';

describe('Users create page', () => {
  let page: UsersCreatePage;

  beforeEach(() => {
    page = new UsersCreatePage();
    (new LoginPage()).LogInToApp();
    page.navigateToUsersCreate();
  });

  it('should enable "Save" button when first name and last name reqs are met', () => {
    const saveButtonElement = page.getSaveButtonElement();
    expect(saveButtonElement.isEnabled()).toBe(false);
    page.setFirstName('jonathan');
    expect(saveButtonElement.isEnabled()).toBe(false);
    page.setLastName('del toro');
    expect(saveButtonElement.isEnabled()).toBe(true);
  });

  it('should display success message and then reset the form when creating a user is successful', () => {
    page.createUser();
    expect(page.getSuccessMessageElement().getText()).toEqual('Record saved successfully!');
    expect(page.getFirstName()).toBe('');
    expect(page.getLastName()).toBe('');
    expect(page.getSaveButtonElement().isEnabled()).toBe(false);
  });

  it('should redirect to /users/list when clicking on cancel button', () => {
    page.clickCancelButton();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/users/list');
  });

});
