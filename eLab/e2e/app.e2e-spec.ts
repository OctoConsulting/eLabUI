import { ELabPage } from './app.po';

describe('e-lab App', () => {
  let page: ELabPage;

  beforeEach(() => {
    page = new ELabPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
