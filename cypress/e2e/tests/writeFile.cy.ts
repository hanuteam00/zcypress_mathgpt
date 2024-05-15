//@ts-check
/// <reference types="cypress" />
const fs = require("fs");
// const { faker } = require("@faker-js/faker");

it("TC1 - write data using cy.writeFile", function () {
  // Generate random data using @faker-js/faker
  cy.getFaker().then((faker) => {
    const record = `record${Date.now()}`;
    const email = `engineer+${record}@gotitapp.co`;
    const password = faker.internet.password();
    // Define the data object
    const data = {
      record,
      email,
      password
    };

    // Write the data to file1.json
    cy.writeFile("cypress/fixtures/writefiles/writeFile.json", data)
    // cy.writeFile("cypress/fixtures/writefiles/writeFile.json", JSON.stringify(data))
  });
});

it("TC2 - push data using cy.writeFile", function () {
  cy.getFaker().then((faker) => {
    // Generate random data using @faker-js/faker
    const record = `record${Date.now()}`;
    const email = `engineer+${record}@gotitapp.co`;
    const password = faker.internet.password();

    cy.readFile("cypress/fixtures/writefiles/pushFile.json").then((data) => {
      data.push({ 'user': record, 'email': email, 'password': password })
      cy.writeFile("cypress/fixtures/writefiles/pushFile.json", data)
    })
  });
});


it("TC3 - write data using fs.writeFile and cy.task in cypress.config.ts", function () {
  // Generate random data using @faker-js/faker
  cy.getFaker().then((faker) => {
    const record = `record${Date.now()}`;
    const email = `engineer+${record}@gotitapp.co`;
    const password = faker.internet.password();

    // Define the data object
    const data = {
      record,
      email,
      password
    };

    // Call the task to write data to writeFile.json
    cy.task('writeFile', { filePath: 'cypress/fixtures/writefiles/writeFile.json', data })
  });
});

it.only("TC4 - Push data using fs.writeFile and cy.task in cypress.config.ts", function () {
  // Generate random data using @faker-js/faker
  cy.getFaker().then((faker) => {
    const record = `record${Date.now()}`;
    const email = `engineer+${record}@gotitapp.co`;
    const password = faker.internet.password();

    const newData = {
      user: record,
      email: email,
      password: password
    };

    cy.task('pushFile', { filePath: "cypress/fixtures/writefiles/pushFile.json", data: newData });

  });
});