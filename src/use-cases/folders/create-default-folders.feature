Feature: Create Default Folders.

  Scenario Outline: Try to create default folders with invalid details, then it will throw error.
    Given Folder details folderName: "<folderName>", userId: "<userId>", providerId: "<providerId>" to create new folder
    When Try to create new folder
    Then It will throw error: "<error>" with message: "<message>" while creating new folder
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | folderName | userId            | providerId                        |error | message                                                |
      |            |                   |                                   |Error | '"folderName" is required'                                   |
      |            | abc               |                                   |Error | '"folderName" is required'                                   |
      | Folder1    |                   |                                   |Error | '"userId" is required'                                  |
      | Folder1    | abc               |                                   |Error | '"userId" must be a number'                                  |
      |            |                   | abc                               |Error | '"folderName" is required'                                   |
      |            | abc               | abc                               |Error | '"folderName" is required'                                   |
      | Folder1    |                   | abc                               |Error | '"userId" is required'                                  |
      | Folder1    | abc               | abc                               |Error | '"userId" must be a number'                                  |
      | 123        | abc               | abc                               |Error | '"folderName" must be a string'                                  |
   
      # | Folder1    | 111               |                                        | 0                           | Error | '"emailAddress" must be a valid email'                        |
      # | Folder1    | 111               | validProviderId                                       | 0                           | Error | '"emailAddress" must be a valid email'                        |

  Scenario Outline: Try to create new user with already used folderName, then it will throw error.
    Given Folder details folderName: "<folderName>", userId: "<userId>", providerId: "<providerId>" to create new folder
    # And Already existed user details: "<userDetailsByEmail>" with same emailAddress
    When Try to create new folder
    Then It will throw error: "<error>" with message: "<message>" while creating new folder
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | folderName | userId            | providerId                        |error | message                         |
      | Exists     |  111              |                                   |Error | 'Folder Already exists'         |
      | Exists     |  111              |  validProviderId                  |Error | 'Folder Already exists'         |


  Scenario Outline: Try to create new user with already used providerId, then it will throw error.
    Given Folder details folderName: "<folderName>", userId: "<userId>", providerId: "<providerId>" to create new folder
    When Try to create new folder
    Then It will throw error: "<error>" with message: "<message>" while creating new folder
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | folderName | userId            | providerId                         |error | message                         |
      | Folder1     |  111              |  usedProviderId                   |Error | '"providerId" Already exists'         |
      | Folder1     |  111              |  usedProviderId                   |Error | '"providerId" Already exists'         |

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

  Scenario Outline: Try to create new folder with valid inputs
    Given Folder details folderName: "<folderName>", userId: "<userId>", providerId: "<providerId>" to create new folder
    When Try to create new folder
    Then It will create new folder with details: "<message>"
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | folderName  | userId           | providerId                        | message             |
      | Folder1     |  111             |  validProviderId                  | folder created   |
      | Folder1     |  111             |                                   | folder created    |