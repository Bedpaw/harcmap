import { Page } from '../utils/init-test';
import { selectors } from '../utils/selectors';

const { admin, teamLeader, teamMember, observer, creator } = Page.roles;
const firstScreenDetails = {
  [creator]: {
    mainIcon: 'settings',
    primaryNavigationButton: selectors.buttons.navigateToScoreboard,
    secondaryNavigationButton: selectors.buttons.navigateToEditEvent,
  },
  [admin]: {
    mainIcon: 'settings',
    primaryNavigationButton: selectors.buttons.navigateToScoreboard,
    secondaryNavigationButton: selectors.buttons.navigateToEditEvent,
  },
  [observer]: {
    mainIcon: 'settings',
    primaryNavigationButton: selectors.buttons.navigateToScoreboard,
    secondaryNavigationButton: selectors.buttons.navigateToSearchPoints,
  },
  [teamLeader]: {
    mainIcon: 'add',
    primaryNavigationButton: selectors.buttons.navigateToMap,
    secondaryNavigationButton: selectors.buttons.navigateToCheckResults,
  },
  [teamMember]: {
    mainIcon: 'bar_chart',
    primaryNavigationButton: selectors.buttons.navigateToMap,
    secondaryNavigationButton: selectors.buttons.navigateToCheckResults,
  },

};
describe('Enter event', () => {
  [creator, admin, observer, teamLeader, teamMember].forEach((role) => {
    it('with role: ' + role, () => {
      const rootUrl = Cypress.config().baseUrl;
      const details = firstScreenDetails[role];
      Page.initTest({ role });

      cy.url().should('eq', rootUrl + '/start');
      cy.dataCy(details.primaryNavigationButton);
      cy.dataCy(details.secondaryNavigationButton);
      cy.get('.a-button.f-big > .a-icon').should('contain.text', details.mainIcon);
    });
  });
});
