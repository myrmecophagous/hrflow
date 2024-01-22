/// <reference types='cypress' />

describe('<JobList />', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the job list', () => {
    cy.get('[data-cy="card-list"]')
      .get('article')
      .should('have.length', 10);
  });

  it('should open modal on click', () => {
    const title = 'Senior software engineer';

    cy.get('[data-cy="card-list"]')
      .get('article')
      .contains(title)
      .click();

    cy.get('[data-cy="card-dialog"]')
      .as('dialog')
      .should('exist');

    cy.get('@dialog')
      .get('h1')
      .contains(title);
  });

  it('should open modal on keyboard navigation', () => {
    cy.get('[data-cy="card-list"]')
      .get('article')
      .first()
      .trigger('keyup', { key: 'Enter', keyCode: 13, which: 13 });

    cy.get('[data-cy="card-dialog"]')
      .should('exist');
  });

  it('should close modal on close button click', () => {
    cy.get('[data-cy="card-list"]')
    .get('article')
    .first()
    .click();

    cy.get('[data-cy="card-dialog"]')
      .as('dialog')
      .get('button[aria-label="Close"]')
      .click();

    cy.get('@dialog')
      .should('not.exist');
  });

  it('should close modal on click outside', () => {
    cy.get('[data-cy="card-list"]')
      .get('article')
      .first()
      .click();

    cy.get('[data-cy="card-dialog"]')
      .as('dialog')
      .prev('div')
      .click({force: true})

    cy.get('@dialog')
      .should('not.exist');
  });

  it('should close modal on press Escape', () => {
    cy.get('[data-cy="card-list"]')
      .get('article')
      .first()
      .click();

    cy.document()
      .trigger('keyup', { key: 'Escape', keyCode: 27, which: 27 });

    cy.get('[data-cy="card-dialog"]')
      .should('not.exist');
  });

  it('should return focus to the card on modal close', () => {
    cy.get('[data-cy="card-list"]')
      .get('article')
      .first()
      .as('firstCard')
      .click();

    cy.document()
      .trigger('keyup', { key: 'Escape', keyCode: 27, which: 27 });

    cy.get('@firstCard')
      .should('have.focus');
  });

  /*
  it('should reorder cards on drag and drop');
  it('should NOT reorder cards if dropped on the same position');
  it('should NOT reorder cards if custom sort is enabled');
  */
});
