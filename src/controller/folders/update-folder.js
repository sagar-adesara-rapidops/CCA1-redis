function makeUpdateFolderAction({ Joi, updateFolder, checkFolderByName }) {
  return async function updateFolderAction(req, res) {
    try {
      console.info(
        `updateFolderAction :: ${JSON.stringify(req.body)} Params:${req.params}`
      );
      const folderName = req.body.folderName;
      const folderId = req.params.folderId;
      const databaseName = req.headers["database-name"];
      const userId = req.headers["userid"];
      console.log("USERID", userId);
      await validateUpdateFolderRequest({ folderName, folderId });
      await checkFolderByName({ databaseName, userId, folderName });
      await updateFolder({ databaseName, folderName, folderId, userId });
      res.send("folder name updated");
    } catch (err) {
      console.error(
        `ERROR in createFolderAction controller :: ${err.message}`,
        { stack: err.stack }
      );
      res.send(err.message);
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
module.exports = makeUpdateFolderAction;
