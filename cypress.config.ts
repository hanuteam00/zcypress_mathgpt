import { defineConfig } from "cypress";
const fs = require('fs');

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      //cy.task để gọi các chức năng Node.js từ file test của Cypress
      //định nghĩa một task trong cypress.config.js để đọc file JSON bằng fs.readFileSync.
      on('task', {
        //readFileSync
        readFileSync(filename) {
          return new Promise((resolve, reject) => {
            try {
              const data = fs.readFileSync(filename, 'utf8');
              resolve(JSON.parse(data));
            } catch (err) {
              reject(err);
            }
          });
        },
        //end of readFileSync

        //readJsonFile
        readFile(filename) {
          return new Promise((resolve, reject) => {
            fs.readFile(filename, 'utf8', (err, data) => {
              if (err) {
                return reject(err);
              }
              resolve(JSON.parse(data));
            });
          });
        },
        //end of readJsonFile

        //writeFile
        writeFile({ filePath, data }) {
          return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
              if (err) {
                return reject(err);
              }
              resolve(null);
            });
          });
        },
        //end of writeFile

        //
        pushFile({ filePath, data }) {
          return new Promise((resolve, reject) => {
            // Read the existing file
            fs.readFile(filePath, 'utf-8', (err, fileData) => {
              if (err) {
                return reject(err);
              }

              let jsonData;
              try {
                jsonData = JSON.parse(fileData);
              } catch (parseError) {
                return reject(parseError);
              }

              // Ensure the existing data is an array
              if (!Array.isArray(jsonData)) {
                jsonData = [];
              }

              // Add the new data to the array
              jsonData.push(data);

              // Write the updated data back to the file
              fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
                if (writeErr) {
                  return reject(writeErr);
                }

                resolve(null);
              });
            });
          });
        }
        //
        
      });

    },
    //enable "record and playback" feature
    experimentalStudio: true,

    /*4000 by default, time, in milliseconds, 
   to wait until most DOM based commands are considered timed out.*/
    defaultCommandTimeout: 30000,

    /*Whether to enable Chromium-based browser's Web Security
   for same-origin policy and insecure mixed content*/
    chromeWebSecurity: false,

    /*60000 by default time, in milliseconds,
   to wait for page transition events or cy.visit(), cy.go(), cy.reload()
   commands to fire their page load events.
   */
    pageLoadTimeout: 60000,

    //set viewport
    viewportWidth: 1920,
    viewportHeight: 1080,

    //set baseUrl
    baseUrl: 'https://dev.mathgpt.ai'
  },
});