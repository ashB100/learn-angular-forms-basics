import { AngularFormsBasicsPage } from './app.po';

describe('angular-forms-basics App', () => {
  let page: AngularFormsBasicsPage;

  beforeEach(() => {
    page = new AngularFormsBasicsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
