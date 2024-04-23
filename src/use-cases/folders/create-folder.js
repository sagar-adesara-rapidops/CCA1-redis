function makeCreateFolder({
  Joi,
  checkFolderByName,
  checkFolderByProviderId,
  createFolderInDb,
  checkUserById,
  updateProviderIdInDb,
  updatePriorityInDb,
}) {
  return async function createFolder({
    databaseName,
    folderName,
    providerId,
    userId,
    nextPageToken,
    syncState,
    priority,
  }) {
    try {
      providerId = providerId ? providerId : null;
      await validateCreateFolderRequest({ userId, folderName, providerId });
      await checkUserById({ databaseName, userId });
      const result = await checkFolderByName({
        databaseName,
        folderName,
        userId,
      });
      if (result.length) {
        await updateProviderIdInDb({
          databaseName,
          userId,
          folderName,
          providerId,
        });
        await updatePriorityInDb({
          databaseName,
          userId,
          folderName,
          priority,
        });
        console.log('folder\'s "providerId" updated');
        return 'folder\'s "providerId" updated';
      }
      if (providerId) {
        await checkFolderByProviderId({ databaseName, providerId, userId });
      }
      console.log(
        "crte fold PRIORITY:::::::: ",
        priority,
        "sync stae::",
        syncState
      );
      await createFolderInDb({
        databaseName,
        userId,
        folderName,
        providerId,
        nextPageToken,
        syncState,
        priority,
      });
      return "folder created";
    } catch (err) {
      throw err;
    }
  };
  async function validateCreateFolderRequest({
    userId,
    folderName,
    providerId,
  }) {
    try {
      console.log(typeof providerId, " : ", providerId);
      const schema = Joi.object({
        folderName: Joi.string().required(),
        userId: Joi.required(),
        providerId: Joi.string().allow(null),
      });
      const { error } = schema.validate({ folderName, userId, providerId });
      if (error) {
        throw new Error(error.details[0].message);
      }
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeCreateFolder;
