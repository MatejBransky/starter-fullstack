/// <reference types="Cypress" />

import foo from '../../support/foo';

describe('API', () => {
  // beforeEach(() => {
  //   cy.fixture('seed').as('seed');
  // });

  it('returns all users', () => {
    // cy.task('seed:db', this.seed);
    foo();
    cy.request('http://localhost:4321/users')
      .its('body')
      .should('be.an', 'array');
  });
});
