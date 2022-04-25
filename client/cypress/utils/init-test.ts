import { testSelectors } from '../../data/selectors';
import { apiResources } from '../../data/api-resources';
import { intercept } from './interceptions';
import { urls } from './urls';

export class Page {
  static roles = {
    teamLeader: 'teamLeader',
    admin: 'admin',
    observer: 'observer',
    teamMember: 'teamMember',
    creator: 'creator',
  };

  static macros = {
    mockData: {
      event1Id: '300000000000000000000001',
      event3TeamLeaderInvitationKey: 'K33e',
    },
  }

  static selectors = testSelectors;

  static initTest ({
    stubServer = Cypress.env('stubServer'),
    openEvent = true,
    role = this.roles.teamLeader,
    loginData = null,
  }) {
    if (stubServer) {
      this.stubServerInit({ role, openEvent });
    } else {
      this.localServerInit({ role, openEvent, loginData });
    }
  }

  static stubServerInit ({ role, openEvent }) {
    intercept.other.checkVersion();
    intercept.auth.signIn(role);
    intercept.events.getEventById();
    intercept.categories.getCategoriesByEventId();
    intercept.teams.getTeamByEventId();
    intercept.points.getPointsByEventId();

    cy.visit('/');

    // Intercept checkSession, so autologged
    cy.wait('@signIn').then((interception) => {
      return this.enterEvent(interception);
    });

  }

  static localServerInit ({ role, openEvent, loginData }) {
    cy.intercept(urls.withBackendPrefix(apiResources.auth.signIn)).as('signIn');

    cy.visit('/sign-in');

    // wait for checkSession call to be sure that it won't mess after
    cy.wait('@signIn').then(() => {

      // Enter credentials
      loginData = loginData ?? this.getLoginData(role);
      cy.dataCy(this.selectors.inputs.email).type(loginData.email);
      cy.dataCy(this.selectors.inputs.password).type(loginData.password);
      const afterLogInResponsePromise = cy.dataCy(this.selectors.buttons.signInSubmit).click().then(() => cy.wait('@signIn'));

      if (openEvent === false) {
        // Just log in
        return afterLogInResponsePromise;
      }
      // Chose event and close guide
      return afterLogInResponsePromise.then((interception) => this.enterEvent(interception));
    });
  }

  private static enterEvent (interception) {
    // Get eventId with role chosen in configuration
    let x = true;
    if (interception.response.body.email === Cypress.env('observer_email')) {
      x = false;
    }
    const eventId = interception.response.body.userEvents[x ? 0 : 1].eventId;

    cy.dataCy(this.selectors.buttons.enterEvent(eventId)).click().then(() =>
      // close guide
      cy.get('.f-close-popup').click());
  }

  private static getLoginData (role) {
    const email = Cypress.env(role + '_email');
    const password = Cypress.env('login_password');
    return { email, password };
  }
}
