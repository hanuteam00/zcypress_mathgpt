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
  await addCucumberPreprocessorPlugin(on, config
    // add json report
    // https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/json-report.md
    // , {
    //   onAfterStep({ attach }) {
    //     attach('{ "name": "foobar" }', "application/json");
    //     attach(Buffer.from("foobar"), "text/plain");
    //   }
    // }
  );

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
    // Environment variables
    env: {
      commandDelay: 500, // Delay between commands
    },
    baseUrl: "https://dev.mathgpt.ai/",
    // Experimental Studio
    experimentalStudio: true,
    // Disable Chrome Web Security
    chromeWebSecurity: false,
    // Enable video recording
    video: true,
    // Enable screenshots on test failures
    screenshotOnRunFailure: true,
    // Trash assets before runs
    trashAssetsBeforeRuns: true,
    // Set viewport dimensions
    viewportWidth: 1920,
    viewportHeight: 1080,
    // Default command timeout
    defaultCommandTimeout: 120000, // 30 seconds
    // Page load timeout
    pageLoadTimeout: 240000, // 1 minute
    // specPattern: "**/*.feature",
    specPattern: "cypress/e2e/features/*.feature",
    setupNodeEvents,
    "slowTestThreshold": 1000,
    //https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/pretty-output.md
    reporter: require.resolve("@badeball/cypress-cucumber-preprocessor/pretty-reporter")

    /* origin config
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    */
  },
});
