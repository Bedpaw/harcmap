/// <reference types="cypress-mailslurp" />
import { Page } from '../utils/init-test';
import { assertions } from '../utils/assertions';
import { getLinkFromEmail } from '../utils/email';

describe('Reset password', () => {
  // WARNING: 50 emails month limit!!!
  it.skip('Reset password works', () => {
    const password = 'Password1';
    const newPassword = 'Password2';

    // Create mailbox
    cy.mailslurp()
      .then(mailslurp => mailslurp.createInbox())
      .then(({ emailAddress, id }) => {
        // Fill and submit registration form
        cy.visit('/sign-up');
        cy.get('[data-cy="input-email"]').type(emailAddress);
        cy.get(':nth-child(2) > [data-cy="input"]').type(password);
        cy.get(':nth-child(3) > [data-cy="input"]').type(password);
        cy.get('[data-cy="button-submit"]').click();

        // Wait for email
        cy.mailslurp()
          .then(mailslurp => mailslurp.waitForLatestEmail(id, 30000))
          .then(email => {
            // Verification success link
            cy.visit(getLinkFromEmail(email));
            cy.get('[data-cy="button-primary"]').click();

            // Account created, reset password
            cy.visit('/remind-password');
            cy.get('[data-cy="input-email"]').type(emailAddress);
            cy.get('[data-cy="button-submit"]').click();

            cy.mailslurp()
              .then(mailslurp => mailslurp.waitForLatestEmail(id, 30000, true))
              .then(email => {
                // Reset password form link
                cy.visit(getLinkFromEmail(email));

                // Set new password
                cy.get(':nth-child(1) > [data-cy="input"]').type(newPassword);
                cy.get(':nth-child(2) > [data-cy="input"]').type(newPassword);
                cy.get('[data-cy="button-submit"]').click();

                Page.initTest({
                  openEvent: false,
                  loginData: {
                    email: emailAddress,
                    password: newPassword,
                  },
                });
                assertions.isThisUrl('/events-list');
              });
          });

      });

  });

});
