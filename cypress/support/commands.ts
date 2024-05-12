//@ts-check
/// <reference types="cypress" />
// require('cypress-xpath');
// require("cypress-plugin-tab");
import { faker } from "@faker-js/faker";
// const { faker } = require("@faker-js/faker");
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


// cypress/support/index.ts
Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
})

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

