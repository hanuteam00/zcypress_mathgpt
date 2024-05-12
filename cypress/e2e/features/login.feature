@viewportHeight(720)
@viewportWidth(1280)
Feature: Login functionality
  In order to use the site
  As a user
  I want to login successfully

  @desktop
  @smoke
  Scenario: Log in with correct credentials
    Given I visit mathgpt dev login page
    When I fill in the login form with valid "<email>" and "<password>"
    And I press the login button
    Then I should see a welcome message
    And I can print the array
      | Milk | Bread | Butter | Jam |

    Examples: First Data Table
      | email                 | password  |
      | manh+edu1@gotitapp.co | Aa123456@ |
      | manh+edu2@gotitapp.co | Aa123456@ |