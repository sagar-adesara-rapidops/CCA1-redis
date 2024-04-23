Feature: Check User by id


Scenario Outline: Try to check user with invalid userId, then it will throw error.
    Given User details userId: "<userId>" to check user by id
    When Try to check user by id
    Then It will throw error: "<error>" with message: <message> while checking user by id

    Examples:
      | userId     | error | message                                |
      |                  | Error |'"userId" is required'            |
      | Abc              | Error |'"userId" must be a number'  |
      # | 123              | Error |'"userId" must be a number'  |



Scenario Outline: Try to check user with valid userId.
    Given User details userId: "<userId>" to check user by id
    When Try to check user by id
    Then It will check user by id

    Examples:
      | userId     | 
      | 12  |  