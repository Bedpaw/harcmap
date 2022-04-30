/// <reference types="cypress-mailslurp" />

import { Page } from '../utils/init-test';
import { assertions } from '../utils/assertions';
import { getLinkFromEmail } from '../utils/email';

describe('Register', () => {
  // WARNING: 50 emails month limit!!!
  it.skip('success registration', () => {
    const password = 'Password1';

    cy.mailslurp()
      .then(mailslurp => mailslurp.createInbox())
      .then(({ emailAddress, id }) => {

        cy.visit('/sign-up');
        cy.get('[data-cy="input-email"]').type(emailAddress);
        cy.get(':nth-child(2) > [data-cy="input"]').type(password);
        cy.get(':nth-child(3) > [data-cy="input"]').type(password);
        cy.get('[data-cy="button-submit"]').click();

        cy.mailslurp()
          .then(mailslurp => mailslurp.waitForLatestEmail(id, 30000, true))
          .then(email => {
            cy.visit(getLinkFromEmail(email));
            cy.get('[data-cy="button-primary"]').click();

            Page.initTest({
              openEvent: false,
              loginData: {
                email: emailAddress,
                password,
              },
            });
            assertions.isThisUrl('/events-list');
          });

      });

  });

});
