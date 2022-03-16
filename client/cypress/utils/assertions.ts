export const assertions = {
  isThisUrl: (url) => {
    const rootUrl = Cypress.config().baseUrl;
    return cy.url().should('eq', rootUrl + url);
  },
};
