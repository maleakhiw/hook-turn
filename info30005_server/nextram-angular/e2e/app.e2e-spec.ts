import { NEXTRAMPage } from './app.po';

describe('nextram App', () => {
  let page: NEXTRAMPage;

  beforeEach(() => {
    page = new NEXTRAMPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
