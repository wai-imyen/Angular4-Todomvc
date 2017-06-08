import { TodomvcPage } from './app.po';

describe('todomvc App', () => {
  let page: TodomvcPage;

  beforeEach(() => {
    page = new TodomvcPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
