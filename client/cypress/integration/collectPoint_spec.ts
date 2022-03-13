import { Page } from '../utils/init-test';
import { intercept } from '../utils/interceptions';
import { testSelectors } from '../../data/selectors';
import { assertions } from '../utils/assertions';
import { urls } from '../utils/urls';
import { apiResources } from '../../data/api-resources';

describe('Collect point', () => {
  it(' - fail!', () => {
    const { teamLeader } = Page.roles;
    const pointKey = 'Poi7';
    const bigIconSelector = '.a-button.f-big > .a-icon';
    if (Cypress.env('stubServer')) {
      intercept.points.collectPoint(teamLeader, pointKey);
    } else {
      cy.intercept(urls.withBackendPrefix(apiResources.points.collectPoint(pointKey))).as('collectPoint');
    }
    Page.initTest({ role: teamLeader });

    cy.get(bigIconSelector).click().then(() => {

      assertions.isThisUrl('/collect-point');

      cy.dataCy(testSelectors.inputs.collectPoint).type(pointKey);
      cy.dataCy(testSelectors.buttons.collectPoint).click().then(() => {
        cy.wait('@collectPoint').then((interception) => {
          /*           cy.dataCy('snackbar');
          cy.dataCy('snackbar').should('not.exist'); */
          cy.dataCy('popup');
          cy.dataCy('popup').should('not.exist');
          assertions.isThisUrl('/map');
        });
      });
    });
  });
});
