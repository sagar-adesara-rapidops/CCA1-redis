Feature: Delete User.


Scenario Outline: Try to delete user with invalid details, then it will throw error.
    Given User details userId: "<userId>" to delete user
    When Try to delete user
    Then It will throw error: "<error>" with message: <message> while deleting user

    Examples:
      | userId     | error | message          |
      |            | Error |'"userId" is required'                                             |
      | Abc        | Error |'"userId" must be a number'                                           |


Scenario Outline: Try to delete user which is not present.
    Given User details userId: "<userId>" to delete user
    When Try to delete user
    Then It will throw error: "<error>" with message: "<message>" while deleting user

    Examples:
      | userId     | error | message          |
      |  22          | Error | User doesn't exist  |


Scenario Outline: Try to delete user with valid details.
    Given User details userId: "<userId>" to delete user
    When Try to delete user
    Then It will delete user "<message>"

    Examples:
      | userId     | message |
      | 1          | User deleted |