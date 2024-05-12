/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
// import { data } from "./beforeTest"; // Import data from beforeTest.js

When("I clicks on Join button to go to the Myer Create Account page", () => {
  //verify Sign in/Join button is visible
  cy.get("button[data-automation='header-account']").should("be.visible");
  //click on Sign in/Join button
  cy.get("button[data-automation='header-account']").click();
  //click on Join link
  cy.get("#dropdownLoginLink").click();
  //verify user is navigated to Join page
  cy.url().should("include", "/join");
  cy.title().should("contain", "Join | MYER");
});

When("I fill out the registration form with valid details", () => {
  //input email
  cy.get("#email").should("be.enabled");
  cy.get("#email").type(`${data.randEmail}`, {
    force: true,
    delay: 50,
  });

  //input password
  cy.get("#password").type(`${data.randPassword}`);

  //input first name
  cy.get("#first-name").type(`${data.randFirstName}`);
  //input last name
  cy.get("#last-name").type(`${data.randLastName}`);

  //input email
  cy.get("#mobile-phone").type(`${data.randPhone}`);

  //input DOB
  cy.get("#date-of-birth").type(`${data.randDOB}`);

  //input Address
  cy.get("#address").type("1 Hanoi");

  //select first recommendation address
  cy.get("div[role='button']:first-child").click({ force: true });
});

When("I submit the registration form", () => {
  //click on Create account
  cy.get("#create-account").click();
});

Then("I should see a success message confirming my account creation", () => {
  //verify text contains
  cy.contains(
    "Your account is active. There was a temporary issue registering your MYER one. Please try again"
  );

  cy.contains(`Hello ${data.randFirstName}`);

  //write information of successful account creation to a json file
  cy.writeToJson(
    "./cypress/fixtures/myerAccount.json",
    `${data.randEmail}`,
    `${data.randPassword}`,
    `${data.randFirstName}`,
    `${data.randLastName}`,
    `${data.randPhone}`,
    `${data.randDOB}`
  );
});

When("I click on the Login button to go to the Myer Login page", () => {
  //verify Sign in/Join button is visible
  cy.get("button[data-automation='header-account']").should("be.visible");
  //click on Sign in/Join button
  cy.get("button[data-automation='header-account']").click();
  //click on Join link
  cy.get("a[data-automation='dropdownLoginLink']").click();
  //verify user is navigated to Join page
  cy.url().should("include", "/login");
  cy.title().should("contain", "Sign in | MYER");
});

When("I enter my newly created account credentials", () => {
  // Retrieve the credentials from the JSON file
  cy.fixture("myerAccount").then((accounts) => {
    // Get the latest account (assuming it's the last item in the array)
    const latestAccount = accounts[accounts.length - 1];

    // Fill in email and password fields
    cy.get("#username").type(latestAccount.randEmail);
    cy.get("#password").type(latestAccount.randPassword);
  });
});

When("I submit the login form", () => {
  // Click on the Sign In button
  cy.get("button[value='default']").click({force: true});
});

Then("I should be redirected to the Myer MFA SMS Challenge", () => {
  // Verify that the user is redirected to the dashboard
  cy.url().should("include", "/mfa-sms-challenge");
  cy.contains("Verify your identity").should("be.visible");
});
