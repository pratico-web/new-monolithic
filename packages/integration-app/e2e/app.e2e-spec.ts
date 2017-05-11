import { IntegrationAppPage } from './app.po';

describe('integration-app App', () => {
  let page: IntegrationAppPage;

  beforeEach(() => {
    page = new IntegrationAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
