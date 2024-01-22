/// <reference types='cypress' />

describe('SearchBar', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the search bar with empty inputs', () => {
    cy.get('[data-cy="search-bar"]')
      .as('searchBar')
      .should('exist');

    cy.get('@searchBar')
      .get('input')
      .should('have.value', '');

    cy.get('@searchBar')
      .get('select')
      .should('have.value', '');
  });

  it('should filter cards by name', () => {
    const query = 'ux';
    const pattern = new RegExp(query, 'i');

    cy.get('[data-cy="search-bar"]')
      .as('searchBar')
      .get('input')
      .as('input')
      .type(query);

    cy.get('[data-cy="card-list"]')
      .get('article')
      .as('articles')
      .should('have.length', 2)
      .contains(pattern);

    cy.reload();

    cy.get('@articles')
      .should('have.length', 2)
      .contains(pattern);

    cy.get('@input')
      .should('have.value', query);

    cy.get('@searchBar')
      .get('button')
      .contains('Reset')
      .click();

    cy.get('@articles')
      .should('have.length', 10);

    cy.get('@input')
      .should('have.value', '');
  });

  it('should filter cards by category', () => {
    const value = 'Financial Services';

    cy.get('[data-cy="search-bar"]')
      .as('searchBar')
      .get('select')
      .first() // TODO select by label "Category" using cypress-testing-library
      .as('category')
      .select(value);

    cy.get('[data-cy="card-list"]')
      .get('article')
      .as('articles')
      .should('have.length', 2);

    cy.reload();

    cy.get('@articles')
      .should('have.length', 2);

    cy.get('@category')
      .should('have.value', value);

    cy.get('@searchBar')
      .get('button')
      .contains('Reset')
      .click();

    cy.get('@articles')
      .should('have.length', 10);
  });

  it('should sort cards', () => {
    cy.get('[data-cy="search-bar"]')
      .as('searchBar')
      .get('select')
      .eq(1) // TODO select by label "Sort by" using cypress-testing-library
      .as('sortBy')
      .select('Name');

    cy.get('[data-cy="card-list"]')
      .get('article')
      .first()
      .as('firstArticle')
      .contains('UX/UI designer');

    cy.reload();

    cy.get('@firstArticle')
      .contains('UX/UI designer');

    cy.get('@sortBy')
      .should('have.value', 'name');

    cy.get('@searchBar')
      .get('button')
      .contains('Reset')
      .click();

    cy.get('@firstArticle')
      .contains('Senior software engineer');
  });

  it('should reverse sort order', () => {
    const value = {
      default: 'Senior software engineer',
      ascending: 'Account Executive',
      descending: 'UX/UI designer',
    }
    cy.get('[data-cy="search-bar"]')
      .as('searchBar')
      .get('select')
      .eq(1) // TODO select by label "Sort by" using cypress-testing-library
      .as('sortBy')
      .select('Name');

    cy.get('[data-cy="card-list"]')
      .get('article')
      .first()
      .as('firstArticle')
      .contains(value.descending);

    cy.get('@searchBar')
      .get('select')
      .eq(2) // TODO select by label "Sort order" using cypress-testing-library
      .as('sortOrder')
      .select('Ascending');

    cy.get('@firstArticle')
      .contains(value.ascending);

    cy.reload();

    cy.get('@sortOrder')
      .should('have.value', '-1');

    cy.get('@firstArticle')
      .contains(value.ascending);

    cy.get('@searchBar')
      .get('button')
      .contains('Reset')
      .click();

    cy.get('@firstArticle')
      .contains(value.default);

    cy.get('@sortOrder')
      .should('be.disabled')
  });
});
