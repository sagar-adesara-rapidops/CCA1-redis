Feature: Update User.


Scenario Outline: Try to update user with invalid details, then it will throw error.
    Given User details userId: "<userId>", newName: "<newName>" to update user
    When Try to update user
    Then It will throw error: "<error>" with message: <message> while updating user

    Examples:
      | userId      | newName   | error | message          |
      |             | Heoooollo | Error |'"userId" is required'         |
      | 123         |        | Error |'"newName" is required'          |
      | Abc         | abc       | Error |'"userId" must be a number'          |


Scenario Outline: Try to update user with valid inputs
    Given User details userId: "<userId>", newName: "<newName>" to update user
    When Try to update user
    Then It will update user


    Examples:
      | userId    | newName   |
      | 123       | sagar     |

