# cypress_cucumber_typescript

https://github.com/badeball/cypress-cucumber-preprocessor

Tech Stack:

- latest cucumber package
- typescript

## Init

cd to expected working
cd cypress_cucumber_typescript
npm init
npm i --save-dev cypress typescript

## Open Cypress Dashboard

npx cypress open

Choose default configuration of Cypress Dashboard to generate configuration files

## Cypress tsconfig
{
  "compilerOptions": {
    //adding for cypress cucumber
    //https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/examples/browserify-ts/tsconfig.json
    "esModuleInterop": true,
    "moduleResolution": "nodenext",
    "module":"nodenext",
    //
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}

## Cypress Configuration
Import required packaged in cypress.config.js
import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
/*use this config same as official example: sometime work, sometimes not work
//https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/examples/browserify-ts/cypress.config.ts
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify";
*/
// import browserify from "@badeball/cypress-cucumber-preprocessor/browserify";
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify";


async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    /*
    use this config same as official example: sometime work, sometimes not work
    //https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/examples/browserify-ts/cypress.config.ts
    preprocessor(config, {
      */
    // browserify(config, {
    preprocessor(config, {
      typescript: require.resolve("typescript"),
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: "https://dev.mathgpt.ai/",
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    pageLoadTimeout: 30000,
    specPattern: "**/*.feature",
    setupNodeEvents,

    /* origin config
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    */
  },
});

## Configuration

In package.json, adding
"cypress-cucumber-preprocessor": {
"nonGlobalStepDefinitions": true,
"stepDefinitions": [
"cypress/e2e/step_definitions/*.{js,ts}"
]
}

## Create Custom Command in Typescript
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('greeting')
             */
            dataCy(value: string): Chainable<JQuery<HTMLElement>>;
            writeToJson(fileNamePath: any, data1: any, data2: any, data3: any, data4: any, data5: any, data6: any): void;
            generateTestData(): Chainable<void>
        }
    }
}
// cypress/support/index.ts
Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
})

## Disable XHR/fetch request and 'uncaught:exception' event in Cypress
Update config in e2e.ts

// Hide fetch/XHR requests from command log
const app = window.top;
if (
  app &&
  !app.document.head.querySelector("[data-hide-command-log-request]")
) {
  const style = app.document.createElement("style");
  style.innerHTML =
    ".command-name-request, .command-name-xhr { display: none }";
  style.setAttribute("data-hide-command-log-request", "");

  app.document.head.appendChild(style);
}

// Listening for the 'uncaught:exception' event in Cypress.
Cypress.on("uncaught:exception", (err, runnable) => {
  // Prevent Cypress from automatically failing the test when an uncaught error occurs.
  // Handle the error here if necessary.
  // If you want Cypress to continue running the test despite the uncaught error, return false.
  return false;
});