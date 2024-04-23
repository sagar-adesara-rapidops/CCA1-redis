function makeGetPriorityFolder({ getPriorityFolderFromDb }) {
  return async function getPriorityFolder({ databaseName, userId }) {
    try {
      let result = await getPriorityFolderFromDb({
        databaseName,
        userId,
      });
      console.log("GET PRIORITY FOLDER USECASSE RESULLT.ROWS", result);
      return result;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = makeGetPriorityFolder;
