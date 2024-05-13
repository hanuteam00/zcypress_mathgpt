/* ==== Test Created with Cypress Studio ==== */
it("record_signup", function () {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit("https://dev.mathgpt.ai/signup?role=educator");
  //   cy.get(':nth-child(1) > .FormInput').clear('e');
  cy.get(":nth-child(1) > .FormInput").type("engineer");
  cy.get(".u-gapSmall > :nth-child(2) > .FormInput").clear();
  cy.get(".u-gapSmall > :nth-child(2) > .FormInput").type("record1");
  cy.get("form.u-widthFull > :nth-child(2) > .FormInput").clear();
  cy.get("form.u-widthFull > :nth-child(2) > .FormInput").type(
    "engineer+record1_a@gotitapp.co"
  );
  cy.get(".FormInputWrapper-sc-8v1liz-1 > .FormInput").clear();
  cy.get(".FormInputWrapper-sc-8v1liz-1 > .FormInput").type("Aa123456@");
  cy.get(".FormInputWrapper-sc-8v1liz-1 > .u-flex > .u-borderNone").click();
  cy.get("form.u-widthFull > .Button > .Button-label").click();
  cy.get(".u-paddingVerticalSmall > .u-marginTopExtraSmall").should(
    "have.text",
    "Manage your courses and students, all in one place!"
  );
  cy.get(".InstructorBadge-sc-hz5s8q-0").should("have.text", "Instructor");
  /* ==== End Cypress Studio ==== */
});
