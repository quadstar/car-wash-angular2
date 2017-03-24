import { CarWashPage } from './app.po';

describe('car-wash App', () => {
  let page: CarWashPage;

  beforeEach(() => {
    page = new CarWashPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
