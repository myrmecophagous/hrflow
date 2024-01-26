/// <reference types='cypress' />

import { customThresholds, desktopConfig } from '../support/lighthouse.config';


describe('Performance', () => {
  it("should verify the lighthouse scores with thresholds", function () {
    cy.visit('/');
    cy.lighthouse(customThresholds, desktopConfig);
  });
});
