/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("precondition", () => {
  cy.visit("http://newtours.demoaut.com/");
});

When("action", () => {
  cy.title().should("eq", "Welcome: Mercury Tours");
});

Then("testable outcome", () => {
  cy.title().should("eq", "Welcome: Mercury Tours");
});
