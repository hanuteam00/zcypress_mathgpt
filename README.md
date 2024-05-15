# cypress_cucumber_typescript - May 13

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
//way 1: 
- "module":"nodenext" or "node16" in tsconfig.json
- declare global in commands.ts
- import support (eg: import { faker } from "@faker-js/faker";) 
    declare global {
      namespace Cypress {
        interface Chainable {
          login(email: string, password: string): Chainable<void>
        }
      }
    }
then we should have config in tsconfig.json like this
{
  "compilerOptions": {
    "module":"nodenex",
    */
    //adding for cypress cucumber
    //https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/examples/browserify-ts/tsconfig.json
    "esModuleInterop": true,
    "module":"nodenext",
    "moduleResolution": "nodenext",
    //
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}

//way 2: 
- "module":"CommonJS" or no "module" in tsconfig.json
- only const { faker } = require("@faker-js/faker"); no import
- no declare global in commands.ts
- import support (eg: import { faker } from "@faker-js/faker";) 
  declare namespace Cypress {
    interface Chainable<Subject> {
      loginUI(email: any, password: any): Chainable<Subject>;
    }
  }
then we should have config in tsconfig.json like this
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}

/*
Node.js không thể thực thi trực tiếp các tập tin TypeScript; chúng cần được biên dịch thành JavaScript trước
1.ts-node/esm: Cypress sẽ sử dụng trình tải Node.js ts-node/esm để biên dịch các tập tin TypeScript. Gói ESM sử dụng cú pháp mô-đun ES (các câu lệnh import và export) để tải mô-đun.
1.1. import (eg: import { faker } from "@faker-js/faker";)
- import là cách chuẩn của ECMAScript, được định nghĩa trong các phiên bản mới của JavaScript.
- import là cách tiện lợi và mạnh mẽ hơn khi làm việc với các module ES6 và TypeScript.
- import giúp tạo ra các phụ thuộc rõ ràng và dễ đọc hơn trong mã nguồn.
- import thường được ưa chuộng trong các dự án mới hoặc khi bạn muốn sử dụng các tính năng của ES6 và TypeScript một cách đầy đủ.
1.2. require (eg: const { faker } = require("@faker-js/faker");)
- require là cách thường được sử dụng trong Node.js trước khi có import.
- require thường được sử dụng trong các dự án cũ hoặc khi cần tương thích ngược với các phiên bản Node.js cũ hơn không hỗ trợ import.
- require có thể được sử dụng để nhập module từ cả thư viện Node.js cũng như các thư viện bên ngoài.
2.ts-node: Nếu dự án của bạn không phải là một gói ESM, Cypress sẽ sử dụng ts-node thông thường để biên dịch
Trong trường hợp này, Cypress ghi đè một số giá trị cấu hình trong tsconfig.json của bạn để làm cho cấu hình TypeScript của bạn tương thích với môi trường chạy Node.js của nó. Các giá trị bị ghi đè bao gồm:
2.1. "module": "commonjs": Chỉ định định dạng module CommonJS, là định dạng mà Node.js hiểu được tự nhiên.
2.2. "moduleResolution": "node": Chỉ định cách giải quyết mô-đun theo thuật toán giải quyết mô-đun của Node.js.
2.3. "preserveValueImports": false: Đảm bảo rằng các mô-đun nhập dựa trên giá trị không được bảo tồn, vì điều này có thể gây ra vấn đề với một số cấu trúc TypeScript khi thực thi trong môi trường chạy của Cypress.

*/

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

## Init Git and add .gitignore
git init

.gitignore
node_modules/

## Params trong cucumber
{string}: Đây là cách viết đơn giản nhất và dễ đọc nhất. Thông thường được sử dụng khi giá trị của tham số không chứa các ký tự đặc biệt hoặc không cần xử lý bất kỳ biểu thức chính quy nào.

(.+): Đây là một cách linh hoạt hơn, cho phép chấp nhận bất kỳ chuỗi ký tự nào. Nó hữu ích khi bạn cần chấp nhận các giá trị có chứa các ký tự đặc biệt hoặc khoảng trắng. Tuy nhiên, nó có thể không dễ đọc như {string} vì nó không rõ ràng nhất là đối với người mới bắt đầu.

"([^=]*)": Đây là biểu thức chính quy regex cho phép xác định các ký tự trong một chuỗi. Nó hữu ích khi bạn cần áp dụng các quy tắc nghiêm ngặt hơn cho đầu vào, như yêu cầu các ký tự cụ thể hoặc loại trừ các ký tự cụ thể. Tuy nhiên, việc sử dụng regex có thể làm cho các step definitions trở nên phức tạp hơn và khó hiểu, đặc biệt là đối với người mới học.

## Data Driven Test
https://filiphric.com/cucumber-in-cypress-a-step-by-step-guide#data-driven-testing
Data tables are defined in the Examples section of your .feature file. Let’s continue with our previous file:
create variables email and password, wrap them in <> to be passed as parameters into our step definitions.
  @smoke
  Scenario: Log in with correct credentials
    Given I visit mathgpt dev login page
    When I fill in the login form with valid "<email>" and "<password>"
    And I press the login button
    Then I should see a welcome message

  Examples:
    | email          | password |
    | manh+edu1@gotitapp.co | Aa123456@  |
    | manh+edu2@gotitapp.co | Aa123456@  |

When I fill in the login form with valid <email> and <password>
When(/^I fill in the login form with valid (.+) and (.+)$/, (email: string, password: string) => {
    // Add code to fill in the login form with the provided email and password
    cy.get("input[placeholder='Enter your email']").type(email);
    cy.get("input[placeholder='Enter your password']").type(password);
});

When I fill in the login form with valid "<email>" and "<password>"
When(/^I fill in the login form with valid "([^=]*)" and "([^=]*)"$/, (email: string, password: string) => {
    // Add code to fill in the login form with the provided email and password
    cy.get("input[placeholder='Enter your email']").type(email);
    cy.get("input[placeholder='Enter your password']").type(password);
});

## Loop in data tables
And I can print the array
    | Milk | Bread | Butter | Jam |

When('I can print the array', (dataTable: any) => {
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

## Group test and our cucumber structure
#Top level group: Feature keyword acts as a describe() block and serves as top level group.
#Sub-group: Rule block, that would further split your scenarios into sub-groups
#beforeEach(): Background step, that will act sort of like a beforeEach() hook in Mocha and run a sequence of steps before every scenario

Feature: Board functionality

  Rule: Happy paths

  Background: Empty board page
    Given I am on empty home page

  Scenario: Opening a board
    When I type in "new board" and submit
    Then I should be redirected to the board detail

  Scenario: Creating a <listName> list within a board
    When I type in "<boardName>" and submit
    And Create a list with the name "<listName>"
    Then I should be redirected to the board detail

  Examples:
    | boardName | listName |
    | Shopping list | Groceries |
    | Rocket launch | Preflight checks 


## Test tagging and filter
https://filiphric.com/cucumber-in-cypress-a-step-by-step-guide#test-tagging

## Configuration of Cucumber preprocessor
https://filiphric.com/cucumber-in-cypress-a-step-by-step-guide#configuration
- .cypress-cucumber-preprocessorrc.json config file that may look like this:
{
  "stepDefinitions": [
    "cypress/e2e/[filepath]/**/*.{js,ts}",
    "cypress/e2e/[filepath].{js,ts}",
    "cypress/support/step_definitions/**/*.{js,ts}",
  ]
}
- Or set everything up right in your package.json by adding the equivalent:
// rest of file skipped for brevity
"cypress-cucumber-preprocessor": {
  "stepDefinitions": [
    "cypress/e2e/[filepath]/**/*.{js,ts}",
    "cypress/e2e/[filepath].{js,ts}",
    "cypress/support/step_definitions/**/*.{js,ts}",
  ]
}

## Reporting, Reports
https://filiphric.com/cucumber-in-cypress-a-step-by-step-guide#reporting
- HTML reports
https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/html-report.md
The report is outputted to cucumber-report.html in the project directory, but can be configured through the html.output property.

- JSON reports
https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/json-report.md
The report is outputted to cucumber-report.json in the project directory, but can be configured through the json.output property.

