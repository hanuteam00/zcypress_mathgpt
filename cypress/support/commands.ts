//@ts-check
/// <reference types="cypress" />
// require('cypress-xpath');
// require("cypress-plugin-tab");
// import { faker } from "@faker-js/faker";
const { faker } = require("@faker-js/faker");
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
way 1: "module":"nodenext" or "node16" in tsconfig.json + import support (eg: import { faker } from "@faker-js/faker";)
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

//way 2: "module":"CommonJS" or no "module" in tsconfig.json + no import (eg: import { faker } from "@faker-js/faker";), only const { faker } = require("@faker-js/faker");

declare namespace Cypress {
  interface Chainable<Subject> {
    loginUI(email: any, password: any): Chainable<Subject>;
    getFaker(): Chainable<any>;
    writeToJson(fileNamePath:any, data1:any, data2:any, data3:any, data4:any, data5:any, data6:any): void;
    // faker: typeof faker;
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

// Define a custom command to access faker
Cypress.Commands.add('getFaker', () => {
  return faker;
});

// cypress/support/index.ts
// Cypress.Commands.add('dataCy', (value) => {
//     return cy.get(`[data-cy=${value}]`)
// })

// Command to write data to a JSON file after successful registration
Cypress.Commands.add(
    "writeToJson",
    (fileNamePath, data1, data2, data3, data4, data5, data6) => {
        // Add data to json file
        const filename = fileNamePath;
        // cy.log('filename: ', filename)
        // cy.log('fileNamePath: ', fileNamePath)
        cy.readFile(filename).then((data) => {
            data.push({
                randEmail: data1,
                randPassword: data2,
                firstName: data3,
                lastName: data4,
                randPhone: data5,
                randDOB: data6,
            });
            cy.writeFile(filename, data);
        });
    }
);
