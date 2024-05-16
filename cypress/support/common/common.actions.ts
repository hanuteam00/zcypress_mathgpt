//@ts-check
/// <reference types="cypress" />
// require('cypress-xpath');
// require("cypress-plugin-tab");
import { faker } from "@faker-js/faker";

// Command to generate test data
Cypress.Commands.add("generateTestData", () => {
    // Define filename for the JSON file
    const filename1 = "cypress/fixtures/data.json";

    // Function to generate a random password
    let generateRandomPassword = () => {
        const uppercaseLetter = /[A-Z]/;
        const number = /[0-9]/;

        let password = "";

        // Generate the first character as an uppercase letter
        password += faker.helpers.arrayElement(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));

        // Generate the rest of the characters
        for (let i = 1; i < 8; i++) {
            const randomChar = faker.random.alphaNumeric(1);
            // Ensure that at least one character is a number and one is uppercase
            if (password.match(uppercaseLetter) === null && i < 7) {
                password += faker.helpers.arrayElement(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
            } else if (password.match(number) === null && i < 7) {
                password += faker.helpers.arrayElement(Array.from("0123456789"));
            } else {
                password += randomChar;
            }
        }

        return password;
    };

    // Usage
    let randPassword = generateRandomPassword();

    // Function to generate a random first name with only alphabetic characters
    const generateRandomFirstName = () => {
        let firstName = faker.name.firstName();

        // Remove any non-alphabetic characters
        firstName = firstName.replace(/[^a-zA-Z]/g, "");

        return firstName;
    };

    // Usage
    const randFirstName = generateRandomFirstName();
    console.log(randFirstName);

    // Function to generate a random last name with only alphabetic characters
    const generateRandomLastName = () => {
        let lastName = faker.name.lastName();

        // Remove any non-alphabetic characters
        lastName = lastName.replace(/[^a-zA-Z]/g, "");

        return lastName;
    };

    // Usage
    const randLastName = generateRandomLastName();
    console.log(randLastName);

    // Generate random phone number
    let randPhone = faker.phone
        .number("04########")
        .replace(/[^a-zA-Z0-9 ]/g, "");

    // Generate random email address
    let randEmail = randFirstName + randLastName + "@mailnesia.com";

    // Function to format date as DD/MM/YYYY
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Function to generate random birthdate
    const generateRandomBirthdate = () => {
        // Generate a random date of birth within a reasonable range (e.g., 18-80 years old)
        const minDate = new Date(new Date().getFullYear() - 80, 0, 1);
        const maxDate = new Date(new Date().getFullYear() - 18, 11, 31);
        const randomBirthdate = faker.date.between(minDate, maxDate);
        return formatDate(randomBirthdate);
    };

    // Usage
    let randDOB = generateRandomBirthdate();

    // Read data from JSON file and append new data
    cy.readFile(filename1).then((data) => {
        data.push({
            randEmail: randEmail,
            randPassword: randPassword,
            randFirstName: randFirstName,
            randLastName: randLastName,
            randPhone: randPhone,
            randDOB: randDOB,
        });
        // Write data back to JSON file
        cy.writeFile(filename1, data);
    });
});
