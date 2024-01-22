/// <reference types='cypress' />

describe('Pagination', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to the next page on number click', () => {
    cy.get('[data-cy="pagination"]')
      .as('pagination')
      .get('button')
      .contains('2')
      .click();

    cy.get('@pagination')
      .get('button[aria-current="page"]')
      .contains('2');

    cy.get('[data-cy="card-list"]')
      .get('article')
      .as('articles')
      .should('have.length', 5);

    cy.get('@articles')
      .contains('Senior software engineer')
      .should('not.exist');
  });

  it('should navigate to the next page on `next` button click', () => {
    cy.get('[data-cy="pagination"]')
      .as('pagination')
      .get('button[aria-label="Next page"]')
      .click();

    cy.get('@pagination')
      .get('button[aria-current="page"]')
      .contains('2');

    cy.get('[data-cy="card-list"]')
      .get('article')
      .as('articles')
      .should('have.length', 5);

    cy.get('@articles')
      .contains('Senior software engineer')
      .should('not.exist');
  });

  it('should navigate to the last page on `last` click', () => {
    cy.get('[data-cy="pagination"]')
      .as('pagination')
      .get('button[aria-label="Last page"]')
      .click();

    cy.get('@pagination')
      .get('button[aria-current="page"]')
      .contains('2');

    cy.get('[data-cy="card-list"]')
      .get('article')
      .as('articles')
      .should('have.length', 5);

    cy.get('@articles')
      .contains('Senior software engineer')
      .should('not.exist');
  });
});
