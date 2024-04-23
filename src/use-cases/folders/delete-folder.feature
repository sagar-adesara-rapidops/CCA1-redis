Feature: Delete a folder.

  Scenario Outline: Try to delete folder , then it will give message.

    Given folder Id: "<folderId>" to delete folder
    When Try to delete folder
    Then It will give message: <message> while deleting folder

  Examples:
    | folderId         | message               |
    |            | '"folderId" is required'    |
    | abc        |'"folderId" must be a number'|
    | 7          | 'folder is deleted'     |