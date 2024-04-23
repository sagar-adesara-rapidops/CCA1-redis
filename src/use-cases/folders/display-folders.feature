Feature: Display Folders.

  Scenario Outline: Try to display folder with invalid details, then it will throw error.
    Given Folder details userId: "<userId>" to display folders
    When Try to display folders
    Then It will throw error: "<error>" with message: "<message>" while displaying folders
   
    Examples:
      | userId      |error  | message                     |
      |             |Error  | '"userId" is required'      |
      | abc         |Error  | '"userId" must be a number' |
      
  # Scenario Outline: Try to update folder with already used folderName, then it will throw error.
  #   Given Folder details folderName: "<folderName>", folderId: "<folderId>", userId: "<userId>" to update folder
  #   When Try to update folder
  #   Then It will throw error: "<error>" with message: "<message>" while updating folder

  #   Examples:
  #     | userId      |error | message                       |
  #     | 11          |Error | '"folderId" is required'      |


  

  Scenario Outline: Try to display folders with valid inputs
    Given Folder details userId: "<userId>" to display folders
    When Try to display folders
    Then It will display folders
    
    Examples:
      | userId   | 
      |  11      |