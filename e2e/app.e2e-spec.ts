import { browser, by, element } from 'protractor';

describe('trusting-social-test App', () => {

  beforeAll(() => {
    browser.get('/');
  });

  it(`should navigate to '/news' by default`, () => {
    expect(browser.getCurrentUrl()).toMatch('/news');
    expect(browser.getTitle()).toEqual('Trusting Social - The New York Times');
  });

  it('should display 10 new items when page is first loaded', () => {
    const newsItems = element.all(by.css('.news__container'));
    expect(newsItems.count()).toEqual(10);
  });

  it('should display 20 news when clicking load more button', () => {
    const loadMoreBtn = element(by.css('.news__load-more button'));
    loadMoreBtn.click();

    const newsItems = element.all(by.css('.news__container'));
    expect(newsItems.count()).toEqual(20);
  });

  it('should open dialog details when clicking news item', () => {
    const dialog = element(by.css('.mat-dialog-container'));
    expect(dialog.isPresent()).toBeFalsy();

    const newsItem = element.all(by.css('.news__container')).first();
    newsItem.click();

    expect(dialog.isPresent()).toBeTruthy();
  });
});
