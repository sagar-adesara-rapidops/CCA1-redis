function makeDisplayFoldersAction({ Joi, displayFolders }) {
  return async function displayFoldersAction(req, res) {
    try {
      console.info(`displayFoldersAction :: ${req.params}`);
      let userId = req.params.userId;
      const databaseName = req.headers["database-name"];

      await validateDisplayFoldersRequest({ userId });
      const folders = await displayFolders({ databaseName, userId });
      res.send(folders);
    } catch (err) {
      console.error(
        `ERROR in createFolderAction controller :: ${err.message}`,
        { stack: err.stack }
      );
      res.send(err.message);
    }
  };
  async function validateDisplayFoldersRequest({ userId }) {
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
module.exports = makeDisplayFoldersAction;
