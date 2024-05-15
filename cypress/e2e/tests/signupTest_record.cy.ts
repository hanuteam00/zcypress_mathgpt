//@ts-check
/// <reference types="cypress" />
// const { faker } = require("@faker-js/faker");
// let faker: any

/* ==== Test Created with Cypress Studio ==== */
it("record_signup", function () {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit("https://dev.mathgpt.ai/signup?role=educator");
  //   cy.get(':nth-child(1) > .FormInput').clear('e');
  cy.get(":nth-child(1) > .FormInput").type("engineer");
  
  // Generate random data using @faker-js/faker
  const record = `record${Date.now()}`;
  const email = `engineer+${record}@gotitapp.co`;
  const password = faker.internet.password();
  cy.log(record);
  cy.log(email);
  cy.log(password);

  /*
  cy.get(".u-gapSmall > :nth-child(2) > .FormInput").clear().type("record1");
  cy.get("form.u-widthFull > :nth-child(2) > .FormInput").clear().type("engineer+record1_a@gotitapp.co");
  cy.get(".FormInputWrapper-sc-8v1liz-1 > .FormInput").clear().type("Aa123456@");
  */

  /*
  cy.get(".FormInputWrapper-sc-8v1liz-1 > .u-flex > .u-borderNone").click();
  cy.get("form.u-widthFull > .Button > .Button-label").click();
  cy.get(".u-paddingVerticalSmall > .u-marginTopExtraSmall").should(
    "have.text",
    "Manage your courses and students, all in one place!"
  );
  cy.get(".InstructorBadge-sc-hz5s8q-0").should("have.text", "Instructor");
  /* ==== End Cypress Studio ==== */
});
