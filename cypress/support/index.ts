// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      login(username: string, password: string): Chainable<Element>;
      getPortfolios(): Chainable<Element>;
      visitPortfolioAnalysis(tableName: string): Chainable<Element>;
    }
  }
}
