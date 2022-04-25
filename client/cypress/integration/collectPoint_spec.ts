import { Page } from '../utils/init-test';
import { testSelectors } from '../../data/selectors';
import { assertions } from '../utils/assertions';
import { intercept } from '../utils/interceptions';

const testScenarios = [
  {
    name: 'Sucess',
    pointKey: 'Poi7',
    messageElementSelector: 'popup',
    messageText: 'Gratulujemy!',
    finalPath: '/map',
  },
  {
    name: 'Already collected',
    pointKey: 'Poi4',
    messageElementSelector: 'snackbar',
    messageText: 'został zebrany',
    finalPath: '/collect-point',

  },
  {
    name: 'Not exist',
    pointKey: '6666',
    messageElementSelector: 'snackbar',
    messageText: 'nie istnieje',
    finalPath: '/collect-point',
  },
];

describe('Collect point', () => {
  before(() => {
    cy.task('resetDb');
  });
  testScenarios.map((
    {
      name,
      pointKey,
      messageElementSelector,
      messageText,
      finalPath,
    },
  ) => {
    it(`- ${name}`, () => {
      const bigIconSelector = '.a-button.f-big > .a-icon';
      intercept.points.collectPoint(Page.roles.teamLeader, Page.macros.mockData.event1Id);
      Page.initTest({});

      cy.get(bigIconSelector).click().then(() => {
        assertions.isThisUrl('/collect-point');

        cy.dataCy(testSelectors.inputs.collectPoint).type(pointKey);
        cy.dataCy(testSelectors.buttons.collectPoint).click();
        cy.wait('@collectPoint').then(() => {
          cy.dataCy(messageElementSelector).contains(messageText);
          cy.dataCy(messageElementSelector).should('not.exist');
          assertions.isThisUrl(finalPath);
        });
      });
    });
  });
});
