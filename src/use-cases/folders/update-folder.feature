Feature: Update Folder.

  Scenario Outline: Try to update folder with invalid details, then it will throw error.
    Given Folder details folderName: "<folderName>", folderId: "<folderId>", userId: "<userId>" to update folder
    When Try to update folder
    Then It will throw error: "<error>" with message: "<message>" while updating folder
   
    Examples:
      | folderName   | folderId          | userId      |error | message                                                |
      |              |                   | 11          |Error | '"folderName" is required'                                   |
      | usedName     |                   | 11          |Error | '"folderId" is required'                                   |
      | updationName |                   | 11          |Error | '"folderId" is required'                                  |
      |              | 111               | 11          |Error | '"folderName" is required'                                  |
      |  updationName| abc               | 11          |Error | '"folderId" must be a number'                                   |
      | usedName     | abc               | 11          |Error | '"folderId" must be a number'                                  |
      
  Scenario Outline: Try to update folder with already used folderName, then it will throw error.
    Given Folder details folderName: "<folderName>", folderId: "<folderId>", userId: "<userId>" to update folder
    When Try to update folder
    Then It will throw error: "<error>" with message: "<message>" while updating folder

    Examples:
      | folderName   | folderId  |userId        |error | message                                                |
      |  usedName    | 111       | 11           |Error | '"folderName" already used'                                   |


  

  Scenario Outline: Try to update folder with valid inputs
    Given Folder details folderName: "<folderName>", folderId: "<folderId>", userId: "<userId>" to update folder
    When Try to update folder
    Then It will update folder
    
    Examples:
      | folderName   | folderId          |
      |  updationName| 123               |