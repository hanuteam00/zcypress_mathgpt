/// <reference types="Cypress" />

// Importing necessary libraries and page objects
import {
  BeforeAll,
  Before,
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";

// Creating instances of page objects
const signupPage = new SignupPage();
const homePage = new HomePage();

let data; // Define data globally

// Hook to run once before all tests
BeforeAll(() => {
  cy.generateTestData();
});

// Hook to run before every test block
Before(() => {
  cy.fixture("data").then((dataTest) => {
    data = dataTest[dataTest.length - 1];
  });
});

// Step definition for navigating to the Myer Home page
Given(/^I am on the Myer Home page$/, () => {
  cy.visit("https://www.myer.com.au/");
  cy.title().should(
    "contain",
    "MYER | Shop Fashion, Homewares, Beauty, Toys & More"
  );
});

// Step definition for clicking on the Join button to go to the Myer Create Account page
When(/^I clicks on Join button to go to the Myer Create Account page$/, () => {
  homePage.accountMenu.should("be.visible").click();
  homePage.joinLink.click();
  cy.url().should("include", "/join");
  cy.title().should("contain", "Join | MYER");
});

// Step definition for filling out the registration form with valid details
When(/^I fill out the registration form with valid details$/, () => {
  signupPage.email.should("be.visible").type(`${data.randEmail}`);
  signupPage.joinButton.should("be.visible");
  signupPage.joinButton.click({ force: true });
  signupPage.password.type(`${data.randPassword}`);
  signupPage.firstName.type(`${data.randFirstName}`);
  signupPage.lastName.type(`${data.randLastName}`);
  signupPage.phoneNumber.type(`${data.randPhone}`);
  signupPage.dob.type(`${data.randDOB}`);
  signupPage.address.type("1 Hanoi");
  signupPage.firstRecommendationAddress.click();
});

// Step definition for submitting the registration form
When(/^I submit the registration form$/, () => {
  signupPage.createButton.should("be.visible");
  signupPage.createButton.click({ force: true });
});

// Step definition for verifying the success message confirming account creation
Then(/^I should see a success message confirming my account creation$/, () => {
  cy.contains(
    "Your account is active. There was a temporary issue registering your MYER one. Please try again"
  );
  cy.contains(`Hello ${data.randFirstName}`);
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
