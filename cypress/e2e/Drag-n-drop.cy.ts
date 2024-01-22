/// <reference types="cypress" />

describe('Drag-n-drop', () => {

  const move = (source: string, target: string, x: number, y: number) => {
    cy.get(source)
      .trigger('dragstart')
      .trigger('dragover', { clientX: x, clientY: y });

    cy.get(target)
      .trigger('dragend', { clientX: x, clientY: y });
  };

  const firstCardTitle = 'Senior software engineer';
  const secondCardTitle = 'Machine Learning Engineer';
  const thirdCardTitle = 'UX/UI designer';

  beforeEach(() => {
    cy.viewport(1696, 1008);
    cy.visit('/');
  });

  it.skip('should reorder cards on drag and drop', () => {
    cy.get('[data-cy="card-list"]')
      .get('article')
      .as('cards');

    cy.get('@cards')
      .first()
      .as('firstCard');

    cy.get('@cards')
      .eq(1)
      .as('secondCard');

    cy.get('@cards')
      .eq(2)
      .as('thirdCard');

    move('@firstCard', '@thirdCard', 960, 280);
    move('@firstCard', '@thirdCard', 960, 280); // bugged, doesn't work on first try

    cy.get('@firstCard')
      .contains(secondCardTitle); // fix assertions

    cy.get('@secondCard')
      .contains(thirdCardTitle);

    cy.get('@thirdCard')
      .contains(firstCardTitle);
  });

  /*
  https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__drag-drop/cypress/e2e/drag_n_drop_spec.cy.js
  it('should NOT reorder cards if dropped on the same position');
  it('should NOT reorder cards if custom sort is enabled');
  */
});
