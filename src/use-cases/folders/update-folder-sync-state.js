function makeUpdateFolderSyncState({ updateFolderSyncStateInDb }) {
  return async function updateFolderSyncState({
    databaseName,
    userId,
    folderName,
    syncState,
  }) {
    try {
      let result = await updateFolderSyncStateInDb({
        databaseName,
        userId,
        folderName,
        syncState,
      });
      console.log(
        "update FolderSyncStatus usecase syncstat:",
        result.rows[0].sync_state
      );
      return result;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = makeUpdateFolderSyncState;
