function makeCheckFolderByName({ selectFolderByNameFromDb }) {
  return async function checkFolderByName({
    databaseName,
    folderName,
    userId,
  }) {
    try {
      let [result, fields] = await selectFolderByNameFromDb({
        databaseName,
        userId,
        folderName,
      });
      console.log("RESULT from chk fold by name usecase:::", result);
      return result;
      // if (result.length) {
      //   throw new Error("Folder Already exists");
      // }
    } catch (err) {
      throw err;
    }
  };
}
module.exports = makeCheckFolderByName;
