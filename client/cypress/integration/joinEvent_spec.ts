import { Page } from '../utils/init-test';
import { assertions } from '../utils/assertions';
import { intercept } from '../utils/interceptions';

const { admin, teamLeader, teamMember, observer, creator } = Page.roles;

describe('Join event', () => {
  [creator, admin, observer, teamLeader, teamMember].forEach((role) => {
    it('with role: ' + role, () => {
      intercept.events.joinEvent(role);
      intercept.events.checkEvent(role);

      const invitationCode = 'xxxx';
      const nickname = 'Nickname';
      const teamName = 'TeamName';

      Page.initTest({ role });
      cy.visit('/events-list');

      cy.dataCy(Page.selectors.buttons.navigateToJoinEvent).click()
        .then(() => {
          assertions.isThisUrl('/join-event');
          cy.dataCy(Page.selectors.inputs.invitationKey).type(invitationCode);
          cy.wait('@checkEvent').then(() => {
            cy.dataCy(Page.selectors.inputs.nickname).type(nickname);
            if (role === Page.roles.teamLeader) {
              cy.dataCy(Page.selectors.inputs.teamName).type(teamName);
            }
            cy.dataCy(Page.selectors.buttons.joinEventSubmit).click().then(() => {
              cy.get('.o-popup').should('exist');
              cy.dataCy(Page.selectors.buttons.joinEventConfirmationSubmit).click().then(() => {
                cy.wait('@joinEvent').then(() => {
                  assertions.isThisUrl('/start');
                });
              });
            });
          });
        });
    });
  });
});
