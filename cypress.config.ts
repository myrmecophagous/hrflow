import { defineConfig } from 'cypress';

import { lighthouse, prepareAudit } from "@cypress-audit/lighthouse";


export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {} as Cypress.Browser, launchOptions) => {
        prepareAudit(launchOptions);
      });
      on("task", {
        lighthouse: lighthouse(),
      });
    },
  },
});
