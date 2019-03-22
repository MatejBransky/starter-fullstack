/// <reference types="Cypress" />

describe('API', () => {
  // beforeEach(() => {
  //   cy.fixture('seed').as('seed');
  // });

  it('returns all users', () => {
    cy.request('http://localhost:4321/users')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });
});
