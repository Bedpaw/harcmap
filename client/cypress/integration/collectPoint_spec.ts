import { Page } from '../utils/init-test';
import { intercept, selectors } from '../utils/selectors';

describe('Collect point', () => {
  it(' - fail!', () => {
    const rootUrl = Cypress.config().baseUrl;
    const pointKey = 'Poi7';
    intercept.points.collectPoint(pointKey, { role: Page.roles.teamLeader, name: 'collect-point' });

    Page.initTest({ role: Page.roles.teamLeader });
    cy.get('.a-button.f-big > .a-icon').click().then(() => {
      cy.url().should('eq', rootUrl + '/collect-point');
      cy.dataCy(selectors.inputs.collectPoint).type(pointKey);
      cy.dataCy(selectors.buttons.collectPoint).click().then(() => {
        cy.wait('@signIn').then((interception) => {
          /*           cy.dataCy('snackbar');
          cy.dataCy('snackbar').should('not.exist'); */
          cy.dataCy('popup');
          cy.dataCy('popup').should('not.exist');
          cy.url().should('eq', rootUrl + '/map');
        });
      });
    });
  });
});
