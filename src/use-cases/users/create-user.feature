Feature: Create New User.

  Scenario Outline: Try to create new user with invalid details, then it will throw error.
    Given User details name: "<name>", emailAddress: "<emailAddress>" to create new user
    # And User details name float: <name>, emailAddress: "<emailAddress>" to create new user
    When Try to create new user
    Then It will throw error: "<error>" with message: "<message>" while creating new user
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | name       | emailAddress      | getUsersDetailByEmailFunctionCallCount | createUserFunctionCallCount | error | message                                                |
      |            |                   | 0                                      | 0                           | Error | '"name" is required'                                   |
      |'Aman Gupta'|                   | 0                                      | 0                           | Error | '"emailAddress" is required'                                  |
      | 123        |                   | 0                                      | 0                           | Error | '"name" must be a string'                                  |
      |            |   aman            | 0                                      | 0                           | Error | '"name" is required'                                  |
      |            |   aman@gmail.com  | 0                                      | 0                           | Error | '"name" is required'                                  |
      |'Aman Gupta'| aman              | 0                                      | 0                           | Error | '"emailAddress" must be a valid email'                        |
      | 111        | aman              | 0                                      | 0                           | Error | '"name" must be a string'                        |
      | 123        | aman@gmail.com    | 0                                      | 0                           | Error | '"name" must be a string'                        |
      # | Aman Gupta | aman@gmail.com    | 0                                      | 0                           | Error | '"emailAddress" must be a valid email'                        |

  Scenario Outline: Try to create new user with already registered emailAddress, then it will throw error.
    Given User details name: "<name>", emailAddress: "<emailAddress>" to create new user
    And Already existed user details: "<userDetailsByEmail>" with same emailAddress
    When Try to create new user
    Then It will throw error: "<error>" with message: "<message>" while creating new user
    And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | name       | emailAddress    | userDetailsByEmail | getUsersDetailByEmailFunctionCallCount | createUserFunctionCallCount | error          | message               |
      | Aman Gupta | hello@gmail.com | '{"id":"10"}'      | 1                                      | 0                           | Error          | 'User Already exists' |

  # Scenario Outline: Try to create new user with already registered mobile, then it will throw error.
  #   Given User details name: "<name>", emailAddress: "<emailAddress>", mobile: "<mobile>", and password: "<password>" to create new user
  #   And Already existed user details: "<userDetailsByMobile>" with same mobile
  #   When Try to create new user
  #   Then It will throw error: "<error>" with message: "<message>" while creating new user
  #   And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
  #   And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
  #   And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
  #   And createUser function will call <createUserFunctionCallCount> time while creating new user

  #   Examples:
  #     | name       | emailAddress                   | mobile        | password   | userDetailsByMobile | getUsersDetailByEmailFunctionCallCount | getUsersDetailByMobileFunctionCallCount | encryptPasswordFunctionCallCount | createUserFunctionCallCount | error          | message                                              |
  #     | Aman Gupta | aman.gupta@rapidops.com | +918319110534 | 1234567890 | '{"id":"10"}'       | 1                                      | 1                                       | 0                                | 0                           | ForbiddenError | 'User with the same mobile number is already exists' |

  Scenario Outline: Try to create new user with valid inputs
    Given User details name: "<name>", emailAddress: "<emailAddress>" to create new user
    # And Encrypted password of provided password is: "<encryptedPassword>"
    When Try to create new user
    Then It will create new user with details: "<newUserDetails>"
    And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | name       | emailAddress                   | mobile        | password   | newUserDetails | encryptedPassword             | getUsersDetailByEmailFunctionCallCount | getUsersDetailByMobileFunctionCallCount | encryptPasswordFunctionCallCount | createUserFunctionCallCount |
      | Aman Gupta | aman.gupta@rapidops.com | +917024166349 | 1234567890 | 1    | fue8374834ry8y832479#$#@iou43 | 1                                      | 1                                       | 1                                | 1                           |
