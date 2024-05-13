/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

/*
way 1: "module":"nodenext" or "node16" in tsconfig.json
declare global {
  namespace Cypress {
    interface Chainable {
        //Custom command to select DOM element by data-cy attribute. (eg: cy.dataCy('greeting'))
      loginUI(email: any, password: any): Chainable<void>;
    }
  }
}

Cypress.Commands.add("loginUI", { prevSubject: false }, (email, password) => {
    cy.visit("/login?role=educator"); // Assuming your login page is at '/login'
    // Enter username and password
    cy.get(`input[name='email']`).type("engineer+edu1@gotitapp.co");
    cy.get(`input[name='password']`).type("Aa123456@");
    // Click on the login button
    cy.get(`form.u-widthFull > .Button:nth-of-type(2)`).click();
});
*/

//way 2: "module":"CommonJS" or no "module" in tsconfig.json
declare namespace Cypress {
  interface Chainable<Subject> {
    loginUI(email: any, password: any): Chainable<Subject>;
  }
}

// Cypress.Commands.add("loginUI", { prevSubject: false }, (email, password) => {
Cypress.Commands.add("loginUI", (email, password) => {
  cy.visit("/login?role=educator"); // Assuming your login page is at '/login'
  // Enter username and password
  cy.get(`input[name='email']`).type(email);
  cy.get(`input[name='password']`).type(password);
  // Click on the login button
  cy.get(`form.u-widthFull > .Button:nth-of-type(2)`).click();
});
