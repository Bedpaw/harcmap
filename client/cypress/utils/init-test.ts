import { apiResources, intercept, ROUTES, selectors } from './selectors';
export class Page {
  static roles = {
    teamLeader: 'teamLeader',
    admin: 'admin',
    observer: 'observer',
    teamMember: 'teamMember',
    creator: 'creator',
  };

  static selectors = selectors

  static initTest ({
    stubServer = Cypress.env('stubServer'),
    openEvent = true,
    role = this.roles.teamLeader,
  }) {
    if (stubServer) {
      intercept.teams.getTeamByEventId();
      intercept.auth.signIn({ role, name: 'sign-in' });
      intercept.events.getEventById();
      intercept.categories.getCategoriesByEventId();
      intercept.points.getPointsByEventId();
    } else {
      cy.intercept(apiResources.auth.signIn).as('signIn');
    }

    cy.visit(ROUTES.signIn);

    if (stubServer === false) {
      const loginData = this.getLoginData(role);
      cy.dataCy(this.selectors.inputs.email).type(loginData.email);
      cy.dataCy(this.selectors.inputs.password).type(loginData.password);
    }
    if (openEvent) {
      cy.wait('@signIn').then((interception) => {
        cy.dataCy(this.selectors.buttons.signInSubmit).click()
          .then(() => {
            if (interception.response.body.userEvents) {
              return this.enterEvent(interception);
            } else {
              cy.wait('@signIn').then((interception) => {
                return this.enterEvent(interception);
              });
            }
          });
      });
    } else {
      return cy.dataCy(this.selectors.buttons.signInSubmit).click();
    }
  }

  private static enterEvent (interception) {
    // TODO
    let x = true;
    if (interception.response.body.email === Cypress.env('observer_email')) {
      x = false;
    }
    const eventId = interception.response.body.userEvents[x ? 0 : 1].eventId;
    cy.dataCy(selectors.buttons.enterEvent(eventId)).click().then(() =>
      cy.get('.f-close-popup').click());
  }

  private static getLoginData (role) {
    if (role === this.roles.admin) {
      return { email: Cypress.env('admin_email'), password: Cypress.env('login_password') };
    } else if (role === this.roles.teamLeader) {
      return { email: Cypress.env('teamLeader_email'), password: Cypress.env('login_password') };
    } else if (role === this.roles.teamMember) {
      return { email: Cypress.env('teamMember_email'), password: Cypress.env('login_password') };
    } else if (role === this.roles.creator) {
      return { email: Cypress.env('creator_email'), password: Cypress.env('login_password') };
    } else if (role === this.roles.observer) {
      return { email: Cypress.env('observer_email'), password: Cypress.env('login_password') };
    }
  }
}
