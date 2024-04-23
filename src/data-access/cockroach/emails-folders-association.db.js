function makeEmailsFoldersAssociationDb({ cockroach }) {
  return { insertFolderAssociationIntoDb };
  // const res = await cockroach.query("SELECT $1::text as message", [
  //   "Hello world!",
  // ]);
  async function insertFolderAssociationIntoDb({
    databaseName,
    emailId,
    folderId,
  }) {
    try {
      // console.log("emailid", emailId);
      let result = await cockroach.query(
        `INSERT INTO ${databaseName}.emails_folders_association (folder_id, email_id) values ($1,$2)`,
        [folderId, emailId]
      );
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeEmailsFoldersAssociationDb;
