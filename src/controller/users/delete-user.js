function makeDeleteUserAction({ Joi, checkUserById, deleteUser }) {
  return async function deleteUserAction(req, res) {
    try {
      console.info(`deleteUserAction :: ${req.params}`);
      const userId = req.params.userId;
      const databaseName = req.headers["database-name"];

      validateDeleteUserRequest({ userId });
      await checkUserById({ databaseName, userId });
      await deleteUser({ databaseName, userId });
      res.send("User deleted");
    } catch (err) {
      console.error(
        `ERROR in createFolderAction controller :: ${err.message}`,
        { stack: err.stack }
      );
      res.send(err.message);
    }
  };

  async function validateDeleteUserRequest({ userId }) {
    try {
      const schema = Joi.object({
        userId: Joi.required(),
      });
      const { error } = schema.validate({ userId });
      if (error) {
        throw new Error(error.details[0].message);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
module.exports = makeDeleteUserAction;
