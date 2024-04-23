// insertFolderAssociationIntoDb
function makeInsertFolderAssociation({ insertFolderAssociationIntoDb }) {
  return async function insertFolderAssociation({
    databaseName,
    emailId,
    folderId,
  }) {
    try {
      let result = await insertFolderAssociationIntoDb({
        databaseName,
        emailId,
        folderId,
      });
      return result;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = makeInsertFolderAssociation;
