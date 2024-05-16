// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './common/common.actions'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
const app = window.top;
if (
  app &&
  !app.document.head.querySelector("[data-hide-command-log-request]")
) {
  const style = app.document.createElement("style");
  style.innerHTML =
    ".command-name-request, .command-name-xhr { display: none }";
  style.setAttribute("data-hide-command-log-request", "");

  app.document.head.appendChild(style);
}

// Listening for the 'uncaught:exception' event in Cypress.
Cypress.on("uncaught:exception", (err, runnable) => {
  // Prevent Cypress from automatically failing the test when an uncaught error occurs.
  // Handle the error here if necessary.
  // If you want Cypress to continue running the test despite the uncaught error, return false.
  return false;
});

/*
declare global {
  namespace Cypress {
    interface Chainable {
       // Custom command to select DOM element by data-cy attribute.
       // @example cy.dataCy('greeting')
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      writeToJson(fileNamePath: any, data1: any, data2: any, data3: any, data4: any, data5: any, data6: any): void;
      generateTestData(): Chainable<void>
    }
  }
}
*/