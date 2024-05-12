// Define CSS selectors for elements on the signup page
const SELECTORS = {
  EMAIL: "#email",
  JOIN_BUTTON: "[class='MuiGrid-root MuiGrid-item'] > button",
  PASSWORD: "#password",
  FIRST_NAME: "#first-name",
  LAST_NAME: "#last-name",
  PHONE_NUMBER: "#mobile-phone",
  DOB: "#date-of-birth",
  ADDRESS: "#address",
  FIRST_RECOMMENDATION_ADDRESS: ".MuiList-root.MuiList-padding>div:first-child",
  CREATE_BUTTON: "#create-account",
};

// Define the SignupPage class to store elements and methods for interacting with them
export default class SignupPage {
  // Getter methods to interact with elements on the signup page

  // Get the email input field
  get email() {
    return cy.get(SELECTORS.EMAIL);
  }

  // Get the join button
  get joinButton() {
    return cy.get(SELECTORS.JOIN_BUTTON);
  }

  // Get the password input field
  get password() {
    return cy.get(SELECTORS.PASSWORD);
  }

  // Get the first name input field
  get firstName() {
    return cy.get(SELECTORS.FIRST_NAME);
  }

  // Get the last name input field
  get lastName() {
    return cy.get(SELECTORS.LAST_NAME);
  }

  // Get the phone number input field
  get phoneNumber() {
    return cy.get(SELECTORS.PHONE_NUMBER);
  }

  // Get the date of birth input field
  get dob() {
    return cy.get(SELECTORS.DOB);
  }

  // Get the address input field
  get address() {
    return cy.get(SELECTORS.ADDRESS);
  }

  // Get the first recommendation address element
  get firstRecommendationAddress() {
    return cy.get(SELECTORS.FIRST_RECOMMENDATION_ADDRESS);
  }

  // Get the create account button
  get createButton() {
    return cy.get(SELECTORS.CREATE_BUTTON);
  }
}
