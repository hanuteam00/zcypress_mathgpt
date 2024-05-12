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
