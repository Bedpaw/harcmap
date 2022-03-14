import { Page } from '../utils/init-test';
import { testSelectors } from '../../data/selectors';
import { assertions } from '../utils/assertions';

const { admin, teamLeader, teamMember, observer, creator } = Page.roles;
const firstScreenDetails = {
  [creator]: {
    mainIcon: 'settings',
    primaryNavigationButton: testSelectors.buttons.navigateToScoreboard,
    secondaryNavigationButton: testSelectors.buttons.navigateToEditEvent,
  },
  [admin]: {
    mainIcon: 'settings',
    primaryNavigationButton: testSelectors.buttons.navigateToScoreboard,
    secondaryNavigationButton: testSelectors.buttons.navigateToEditEvent,
  },
  [observer]: {
    mainIcon: 'settings',
    primaryNavigationButton: testSelectors.buttons.navigateToScoreboard,
    secondaryNavigationButton: testSelectors.buttons.navigateToSearchPoints,
  },
  [teamLeader]: {
    mainIcon: 'add',
    primaryNavigationButton: testSelectors.buttons.navigateToMap,
    secondaryNavigationButton: testSelectors.buttons.navigateToCheckResults,
  },
  [teamMember]: {
    mainIcon: 'bar_chart',
    primaryNavigationButton: testSelectors.buttons.navigateToMap,
    secondaryNavigationButton: testSelectors.buttons.navigateToCheckResults,
  },

};
describe('Enter event', () => {
  [creator, admin, observer, teamLeader, teamMember].forEach((role) => {
    it('with role: ' + role, () => {
      const details = firstScreenDetails[role];
      const bigIconSelector = '.a-button.f-big > .a-icon';

      Page.initTest({ role });

      assertions.isThisUrl('/start');

      // auto assertions if found
      cy.dataCy(details.primaryNavigationButton);
      cy.dataCy(details.secondaryNavigationButton);

      cy.get(bigIconSelector).should('contain.text', details.mainIcon);
    });
  });
});
