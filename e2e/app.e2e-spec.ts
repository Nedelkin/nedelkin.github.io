import { D3BritCoPage } from './app.po';

describe('d3-brit-co App', function() {
  let page: D3BritCoPage;

  beforeEach(() => {
    page = new D3BritCoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
