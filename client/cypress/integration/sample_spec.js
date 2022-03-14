import { Page } from '../utils/init-test';

describe('Test init', () => {
  it('successfully loads', () => {
    Page.initTest({ role: Page.roles.admin });
  });
});
