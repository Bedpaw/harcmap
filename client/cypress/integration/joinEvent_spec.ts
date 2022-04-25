import { Page } from '../utils/init-test';
import { assertions } from '../utils/assertions';
import { intercept } from '../utils/interceptions';

describe('Join event', () => {
  before(() => {
    cy.task('resetDb');
  });
  it('as team leader', () => {
    const role = Page.roles.teamLeader;
    const nickname = 'Nickname';
    const teamName = 'TeamName';

    intercept.events.checkEvent(role);
    intercept.events.joinEvent(role);

    Page.initTest({ role });

    cy.visit('/events-list');

    cy.dataCy(Page.selectors.buttons.navigateToJoinEvent).click()
      .then(() => {
        assertions.isThisUrl('/join-event');
        cy.dataCy(Page.selectors.inputs.invitationKey).type(Page.macros.mockData.event3TeamLeaderInvitationKey);
        cy.wait('@checkEvent').then(() => {
          cy.dataCy(Page.selectors.inputs.nickname).type(nickname, { force: true });
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
