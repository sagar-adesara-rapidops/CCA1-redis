function makeCreateDefaultFolders({
  Joi,
  checkFolderByName,
  createFolderInDb,
  checkUserById,
  createFolder,
}) {
  return async function createDefaultFolders({ databaseName, userId }) {
    try {
      // let folderData = { folderData: `Inbox` };
      // await createFolder({ userId, folderData });
      await validateCreateDefaultFoldersRequest({ userId });
      await checkUserById({ databaseName, userId });
      console.log("Inside Default folder-file");
      const folderNames = ["INBOX", "TRASH", "SENT"];
      folderNames.forEach(async (folderName) => {
        console.log(userId, folderName);
        await checkFolderByName({ databaseName, folderName, userId });
        await createFolder({
          databaseName,
          userId,
          folderName,
          providerId: null,
          nextPageToken: null,
          syncState: "STANDBY",
          priority: 9,
        });
        // await createFolderInDb({
        //   databaseName,
        //   userId,
        //   folderName,
        //   providerId: null,
        // });
      });
      // let folderName = folderData.folderName;
      // let providerId = folderData.providerId ? folderData.providerId : null;
      // await checkIfFolderExists({ emailAddress });
      // await createFolderInDb({
      //   userId,
      //   folderName,
      //   providerId,
      // });
    } catch (err) {
      throw err;
    }
  };
  async function validateCreateDefaultFoldersRequest({ userId }) {
    try {
      const schema = Joi.object({
        userId: Joi.required(),
      });
      const { error } = schema.validate({ userId });
      if (error) {
        throw new Error(error.details[0].message);
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = makeCreateDefaultFolders;
