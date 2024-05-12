// Define CSS selectors for elements on the home page
const ACCOUNT_MENU_SELECTOR = "[data-automation='header-account']";
const JOIN_LINK_SELECTOR = "[data-automation='dropdownJoinLink']";

// Define the HomePage class to store elements and methods for interacting with them
export default class HomePage {
  // Getter method to return the account menu element
  get accountMenu() {
    // Return the Cypress object representing the account menu element
    return cy.get(ACCOUNT_MENU_SELECTOR);
  }

  // Getter method to return the join link element
  get joinLink() {
    // Return the Cypress object representing the join link element
    return cy.get(JOIN_LINK_SELECTOR);
  }
}
