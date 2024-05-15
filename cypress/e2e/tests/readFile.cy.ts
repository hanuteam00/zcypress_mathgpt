//@ts-check
/// <reference types="cypress" />

it("TC1 - read files using cypress readFile", function () {
  cy.readFile("cypress/fixtures/readfiles/multiple_accounts.json")
    .then((data) => {
      //way 1:
      // data.forEach((account: { email: string, password: string }) => {
      //way 2:
      data.forEach((account: any) => {
        cy.log("Email: ", account.email);
        cy.log("Password: ", account.password);
      });
    });

  cy.readFile("cypress/fixtures/readfiles/single_account.json").its('email').should('eq', 'engineer+edu1@gotitapp.co');

  cy.readFile("cypress/fixtures/readfiles/single_account.json").then((data) => {
    // Kiểm tra thuộc tính 'email'
    expect(data.email).to.eq('engineer+edu1@gotitapp.co');

    // Log thuộc tính 'password'
    cy.log("password: " + data.password);
  })

});

it("TC2 - read files using fs.readFileSync and cy.task in cypress.config.ts", function () {
  //way 1: using fs.readFileSync
  // Sử dụng task để đọc file JSON
  cy.task('readFileSync', 'cypress/fixtures/readfiles/multiple_accounts.json').then((accounts: any) => {
    accounts.forEach((account: { email: string, password: string }) => {
      cy.log("Email: ", account.email);
      cy.log("Password: ", account.password);
    });
  });
  // const data = fs.readFileSync("cypress/fixtures/readfiles/existing_account.json");
  // const accounts = JSON.parse(data);
  // accounts.forEach((account: { email: string, password: string }) => {
  //   cy.log("Email: ", account.email);
  //   cy.log("Password: ", account.password);
  // });
});

it("TC3 - read files using fs.readFile and cy.task in cypress.config.ts", function () {
  //way 2: using fs.readFile
  cy.task('readFile', 'cypress/fixtures/readfiles/multiple_accounts.json').then((accounts:any) => {
    accounts.forEach((account: { email: string, password: string }) => {
      cy.log("Email: ", account.email);
      cy.log("Password: ", account.password);
    });
  });
});

