/// <reference types="Cypress" />

// Importing necessary libraries and page objects
import { BeforeAll, Before, Given, When, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";

// Creating instances of page objects
const signupPage = new SignupPage();
const homePage = new HomePage();

let data: any; // Define data globally

// Hook to run once before all tests
Before(() => {
    cy.generateTestData().then(() => {
      cy.fixture("data").then((dataTest) => {
        data = dataTest[dataTest.length - 1];
      });
    });
  });

Given(/^I visit mathgpt dev login page$/, () => {
    cy.visit('/login?role=educator');
});

// When('I fill in the login form with valid {string} and {string}', (email: string, password: string) => {
//     // Add code to fill in the login form with the provided email and password
//     cy.get("input[placeholder='Enter your email']").type(email);
//     cy.get("input[placeholder='Enter your password']").type(password);
// });

// When(/^I fill in the login form with valid (.+) and (.+)$/, (email: string, password: string) => {
//     // Add code to fill in the login form with the provided email and password
//     cy.get("input[placeholder='Enter your email']").type(email);
//     cy.get("input[placeholder='Enter your password']").type(password);
// });

When(/^I fill in the login form with valid "([^=]*)" and "([^=]*)"$/, (email: string, password: string) => {
    // Add code to fill in the login form with the provided email and password
    cy.get("input[placeholder='Enter your email']").type(email);
    cy.get("input[placeholder='Enter your password']").type(password);
});

When(/^I press the login button$/, () => {
    // Add code to press the login button
    cy.get("button[class='Button u-flexInline u-justifyContentCenter u-alignItemsCenter u-textDecorationNone u-roundedMedium u-fontMedium u-backgroundPrimary hover:u-backgroundPrimaryDark u-border u-borderPrimary hover:u-textDecorationNone u-cursorPointer u-textUppercase u-textWhite hover:u-textWhite ButtonWrapper-sc-1hysio5-1 caseRi is-primary Button--large u-widthFull u-roundedLarge u-textTransformNone u-fontSemiBold']").click();
});

Then(/^I should see a welcome message$/, () => {
    // Add code to verify the presence of a welcome message
    cy.get("div[class='u-marginTopExtraSmall']").should("contain.text", "Manage your courses and students, all in one place!");
});

// When('I can print the array', (dataTable: DataTable) => {
When(/^I can print the array$/, (dataTable: any) => {
    //way 1: using rawTable
    dataTable.rawTable.forEach((row: any) => {
        // Print out each row of data using cy.log
        // cy.log(row.join(', '));
        cy.log('row: ' + row);
        /*output: 
        row: Milk,Bread,Butter,Jam
        */
    });

    //way 2: using raw()
    dataTable.raw()[0].forEach((item: any) => {
        cy.log('item: ' + item);
        /*output: item: Milk
        item: Bread
        item: Butter
        item: Jam
        */
    })
});

