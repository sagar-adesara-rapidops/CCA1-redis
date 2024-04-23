function makeFoldersDb({ mysql }) {
  return {
    createFolderInDb,
    deleteFolderFromDb,
    displayFoldersFromDb,
    updateFolderInDb,
    selectFolderByNameFromDb,
    selectFolderByProviderIdFromDb,
  };

  async function createFolderInDb({
    databaseName,
    userId,
    folderName,
    providerId,
  }) {
    try {
      let [result, fields] = await mysql.execute(
        `INSERT INTO ${databaseName}.folders (folderName, userId, providerId) values(?,?, ?)`,
        [folderName, userId, providerId]
      );
    } catch (err) {
      throw err;
    }
  }

  async function displayFoldersFromDb({ databaseName, userId }) {
    try {
      let [result, fields] = await mysql.execute(
        `SELECT  folderName FROM ${databaseName}.folders WHERE userId = ? `,
        [userId]
      );
      return [result, fields];
    } catch (err) {
      throw err;
    }
  }
  async function deleteFolderFromDb({ databaseName, folderId }) {
    try {
      console.log("DATA ACCES DELETE", folderId, databaseName);
      let [result, fields] = await mysql.execute(
        `DELETE FROM ${databaseName}.folders WHERE folderId = ?`,
        [folderId]
      );
    } catch (err) {
      throw err;
    }
  }
  async function updateFolderInDb({ databaseName, folderId, folderName }) {
    try {
      let [result, fields] = await mysql.execute(
        `UPDATE ${databaseName}.folders SET folderName= ? WHERE folderId = ?`,
        [folderName, folderId]
      );
    } catch (err) {
      throw err;
    }
  }
  async function selectFolderByNameFromDb({
    databaseName,
    userId,
    folderName,
  }) {
    try {
      let [result, fields] = await mysql.execute(
        `SELECT folderName from ${databaseName}.folders WHERE userId = ? AND folderName = ?`,
        [userId, folderName]
      );
      return [result, fields];
    } catch (err) {
      throw err;
    }
  }
  async function selectFolderByProviderIdFromDb({
    databaseName,
    userId,
    providerId,
  }) {
    try {
      let [result, fields] = await mysql.execute(
        `SELECT folderName, providerId from ${databaseName}.folders WHERE userId = ? AND providerId = ?`,
        [userId, providerId]
      );
      return [result, fields];
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeFoldersDb;
