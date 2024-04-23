function makeDeleteFolder({ Joi, deleteFolderFromDb }) {
  return async function deleteFolder({ databaseName, folderId }) {
    try {
      await validateDeleteFolderRequest({ folderId });
      await deleteFolderFromDb({ databaseName, folderId });
      return "folder is deleted";
    } catch (err) {
      throw err;
    }
  };
  async function validateDeleteFolderRequest({ folderId }) {
    try {
      const schema = Joi.object({
        folderId: Joi.required(),
      });
      const { error } = schema.validate({ folderId });
      if (error) {
        throw new Error(error.details[0].message);
      }
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeDeleteFolder;
