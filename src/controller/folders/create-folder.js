function makeCreateFolderAction({
  Joi,
  createFolder,
  CheckFolderByName,
  checkFolderByProviderId,
}) {
  return async function createFolderAction(req, res) {
    try {
      console.info(`createFolderAction :: ${JSON.stringify(req.body)}`);
      const databaseName = req.headers["database-name"];

      const userId = req.params.userId;
      const folderName = req.body.folderName;
      const providerId = req.body.providerId;
      await validateCreateFolderRequest({ userId, folderName, providerId });
      await CheckFolderByName({ databaseName, userId, folderName });
      if (providerId) {
        await checkFolderByProviderId({ databaseName, userId, providerId });
      }
      await createFolder({ databaseName, folderName, providerId, userId });
      res.send("folder created");
    } catch (err) {
      console.info(err.stack);
      console.error(
        `ERROR in createFolderAction controller :: ${err.message}`,
        { stack: err.stack }
      );
      res.send(err.message);
    }
  };
  async function validateCreateFolderRequest({
    userId,
    folderName,
    providerId,
  }) {
    try {
      const schema = Joi.object({
        userId: Joi.required(),
        folderName: Joi.string().required(),
        providerId: Joi.string(),
      });
      const { error } = schema.validate({
        userId,
        folderName,
        providerId,
      });
      if (error) {
        throw new Error(error.details[0].message);
      }
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeCreateFolderAction;
