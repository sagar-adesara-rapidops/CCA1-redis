function makeDeleteFolderAction({ Joi, deleteFolder }) {
  return async function deleteFolderAction(req, res) {
    try {
      console.info(`deleteFolderAction :: ${req.params}`);
      const folderId = req.params.folderId;
      const databaseName = req.headers["database-name"];

      await validateDeleteFolderRequest({ folderId });

      await deleteFolder({ databaseName, folderId });
      res.send("Folder deleted");
    } catch (err) {
      console.error(
        `ERROR in createFolderAction controller :: ${err.message}`,
        { stack: err.stack }
      );
      res.send(err.message);
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
module.exports = makeDeleteFolderAction;
