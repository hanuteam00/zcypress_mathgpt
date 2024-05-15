//@ts-check
/// <reference types="cypress" />

describe("Test Suite 1 - Login Tests", () => {
  let data: any;

  //way 1: using fixture globally
  beforeEach(() => {
    cy.fixture("login_single").then((testData) => {
      data = testData;
    });
  });

  context("Test Group 1 - Successful Login", () => {
    it("TC 1 - login successfully with correct credentials", () => {
      cy.loginUI(data.email, data.password);
      /*
      cy.loginUI("engineer+edu1@gotitapp.co", "Aa123456@");
      cy.visit('/login?role=educator'); // Assuming your login page is at '/login'
      // Enter username and password
      cy.get(`input[name='email']`).type('engineer+edu1@gotitapp.co');
      cy.get(`input[name='password']`).type('Aa123456@');
      // Click on the login button
      cy.get(`form.u-widthFull > .Button:nth-of-type(2)`).click();
      */
      // Assert that login was successful
      cy.get(`div[class^='GreetingHeading']`).should("contain", "Welcome");
      cy.get(`div[class='u-marginTopExtraSmall']`).should(
        "contain",
        "Manage your courses and students, all in one place!"
      );
    });
    it("TC 1b - login successfully with multiple credentials", () => {
      //way 2: using fixture locally
      cy.fixture("login_multiple").then((dataMany) => {
        dataMany.forEach((accountList:any) => {
          cy.loginUI(accountList.email, accountList.password);
          // Assert that login was successful
          cy.get(`div[class^='GreetingHeading']`).should("contain", "Welcome");
          cy.get(`div[class='u-marginTopExtraSmall']`).should(
            "contain",
            "Manage your courses and students, all in one place!"
          );
          //clear all cookies and storages
          cy.clearAllLocalStorage();
          cy.clearAllCookies()
          cy.wait(5000);
        });
      });
    });
  });

  context("Test Group 2 - Failed Login", () => {
    it("TC 2 - login unsuccessfully - display error message with incorrect username", () => {
      cy.loginUI("ABC+edu1@gotitapp.co", "Aa123456@");
      /*
            cy.visit('/login?role=educator'); // Assuming your login page is at '/login'
            // Enter username and password
            cy.get(`input[name='email']`).type('ABC+edu1@gotitapp.co');
            cy.get(`input[name='password']`).type('Aa123456@');
            // Click on the login button
            cy.get(`form.u-widthFull > .Button:nth-of-type(2)`).click();
            */
      // Assert that login was unsuccessful
      cy.get(`.Message-content`).should(
        "contain",
        "Invalid email or password. Please try again!"
      );
    });
    it("TC 3 - login unsuccessfully - display error message with incorrect password", () => {
      cy.loginUI("engineer+edu1@gotitapp.co", "Aa123456@@@@@@");
      /*
            cy.visit('/login?role=educator'); // Assuming your login page is at '/login'
            // Enter username and password
            cy.get(`input[name='email']`).type('engineer+edu1@gotitapp.co');
            cy.get(`input[name='password']`).type('Aa123456@@@@@@');
            // Click on the login button
            cy.get(`form.u-widthFull > .Button:nth-of-type(2)`).click();
            */
      // Assert that login was unsuccessful
      cy.get(`.Message-content`).should(
        "contain",
        "Invalid email or password. Please try again!"
      );
    });
  });
});
