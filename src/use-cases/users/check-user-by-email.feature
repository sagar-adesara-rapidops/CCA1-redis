Feature: Check User by email


Scenario Outline: Try to check user with invalid email, then it will throw error.
    Given User details emailAddress: "<emailAddress>" to check user
    When Try to check user
    Then It will throw error: "<error>" with message: <message> while checking user

    Examples:
      | emailAddress     | error | message                                |
      |                  | Error |'"emailAddress" is required'            |
      | Abc              | Error |'"emailAddress" must be a valid email'  |
      | 123              | Error |'"emailAddress" must be a valid email'  |



Scenario Outline: Try to check user with valid emailAddress.
    Given User details emailAddress: "<emailAddress>" to check user
    When Try to check user
    Then It will check user 

    Examples:
      | emailAddress     | message      |
      | sagar@gmail.com  | User Already exists |