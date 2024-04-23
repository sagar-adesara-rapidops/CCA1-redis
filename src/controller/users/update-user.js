function makeUpdateUserAction({ Joi, checkUserById, updateUser }) {
  return async function updateUserAction(req, res) {
    try {
      console.info(
        `updateUserAction :: ${JSON.stringify(req.body)} Params:${req.params}`
      );
      const databaseName = req.headers["database-name"];
      const newName = req.body.newName;
      const userId = req.params.userId;
      console.log(newName, userId);
      await validateUpdateUserRequest({ newName, userId });
      await checkUserById({ databaseName, userId });
      await updateUser({ databaseName, newName, userId });
      res.send("Username updated");
    } catch (err) {
      console.error(
        `ERROR in createFolderAction controller :: ${err.message}`,
        { stack: err.stack }
      );
      res.send(err.message);
    }
  };
  async function validateUpdateUserRequest({ newName, userId }) {
    try {
      console.log("Validate request", newName);
      const schema = Joi.object({
        newName: Joi.string().min(3).required(),
        userId: Joi.required(),
      });
      const { error } = schema.validate({ newName, userId });
      if (error) {
        throw new Error(error.details[0].message);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
module.exports = makeUpdateUserAction;
