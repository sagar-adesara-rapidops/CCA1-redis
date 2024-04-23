function makeFoldersDb({ cockroach }) {
  return {
    createFolderInDb,
    deleteFolderFromDb,
    displayFoldersFromDb,
    updateFolderInDb,
    selectFolderByNameFromDb,
    selectFolderByProviderIdFromDb,
    updateProviderIdInDb,
    getPriorityFolderFromDb,
    updatePriorityInDb,
    updateFolderSyncStateInDb,
  };

  async function createFolderInDb({
    databaseName,
    userId,
    folderName,
    providerId,
    priority,
    nextPageToken,
    syncState,
  }) {
    // nextPageToken,
    // syncState
    try {
      let result = await cockroach.query(
        `INSERT INTO ${databaseName}.folders (folder_name, user_id, provider_id,priority, next_page_token, sync_state) values($1,$2, $3, $4, $5, $6) RETURNING folder_id`,
        [folderName, userId, providerId, priority, nextPageToken, syncState]
      );
      console.log("FOLDERNAME FROM DATA ACCESS FILE", {
        folderName,
        syncState,
      });
    } catch (err) {
      throw err;
    }
  }

  async function displayFoldersFromDb({ databaseName, userId }) {
    try {
      let result = await cockroach.query(
        `SELECT  folder_name FROM ${databaseName}.folders WHERE user_id = $1 `,
        [userId]
      );
      return [result.rows, "fields"];
    } catch (err) {
      throw err;
    }
  }
  async function deleteFolderFromDb({ databaseName, folderId }) {
    try {
      console.log("DATA ACCES DELETE", folderId, databaseName);
      let result = await cockroach.query(
        `DELETE FROM ${databaseName}.folders WHERE folder_id = $1`,
        [folderId]
      );
    } catch (err) {
      throw err;
    }
  }
  async function updateFolderInDb({ databaseName, folderId, folderName }) {
    try {
      let result = await cockroach.query(
        `UPDATE ${databaseName}.folders SET folder_name= $1 WHERE folder_id = $2`,
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
      let result = await cockroach.query(
        `SELECT folder_name from ${databaseName}.folders WHERE user_id = $1 AND folder_name = $2`,
        [userId, folderName]
      );
      return [result.rows, "fields"];
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
      let result = await cockroach.query(
        `SELECT folder_name, provider_id from ${databaseName}.folders WHERE user_id = $1 AND provider_id = $2`,
        [userId, providerId]
      );
      return [result, "fields"];
    } catch (err) {
      throw err;
    }
  }
  async function updateProviderIdInDb({
    databaseName,
    userId,
    providerId,
    folderName,
  }) {
    try {
      let result = await cockroach.query(
        `UPDATE ${databaseName}.folders SET provider_id = $1 WHERE user_id = $2 AND folder_name = $3`,
        [providerId, userId, folderName]
      );
      return [result, "fields"];
    } catch (err) {
      throw err;
    }
  }

  async function getPriorityFolderFromDb({ databaseName, userId }) {
    try {
      let result = await cockroach.query(
        `SELECT folder_name, folder_id from ${databaseName}.folders where priority > 0 AND user_id = $1 AND sync_state != 'FETCHED' ORDER BY priority ASC LIMIT 1 `,
        [userId]
      );
      console.log("uchamuchu folder:::", result.rows);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }
  async function updatePriorityInDb({
    databaseName,
    userId,
    folderName,
    priority,
  }) {
    try {
      let result = await cockroach.query(
        `UPDATE ${databaseName}.folders SET priority = $1 WHERE user_id = $2 AND folder_name = $3 `,
        [priority, userId, folderName]
      );
      return [result, "fields"];
    } catch (err) {
      throw err;
      // providerId;
    }
  }
  async function updateFolderSyncStateInDb({
    databaseName,
    userId,
    folderName,
    syncState,
  }) {
    try {
      console.log(
        "update fold sync state query",
        databaseName,
        userId,
        folderName,
        syncState
      );
      let result = await cockroach.query(
        `UPDATE ${databaseName}.folders SET sync_state = $1 WHERE user_id = $2 AND folder_name = $3 RETURNING folder_id, sync_state`,
        [syncState, userId, folderName]
      );
      console.log("update sync state result", result);
      return result;
    } catch (err) {
      throw err;
      // providerId;
    }
  }
}
module.exports = makeFoldersDb;
