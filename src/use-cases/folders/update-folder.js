function makeUpdateFolder({
  Joi,
  updateFolderInDb,
  checkFolderByName,
  checkUserById,
}) {
  return async function updateFolder({
    databaseName,
    folderName,
    folderId,
    userId,
  }) {
    try {
      await validateUpdateFolderRequest({ folderName, folderId });
      await checkUserById({ databaseName, userId });
      await checkFolderByName({ databaseName, folderName, userId });
      await updateFolderInDb({ databaseName, folderName, folderId });
    } catch (err) {
      throw err;
    }
  };

  async function validateUpdateFolderRequest({ folderName, folderId }) {
    try {
      console.log("Validate request");
      const schema = Joi.object({
        folderName: Joi.string().min(3).required(),
        folderId: Joi.required(),
      });
      const { error } = schema.validate({ folderName, folderId });
      if (error) {
        throw new Error(error.details[0].message);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
module.exports = makeUpdateFolder;
