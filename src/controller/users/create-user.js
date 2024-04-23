function makeCreateUserAction({
  Joi,
  checkUserByEmail,
  createUser,
  createDefaultFolders,
}) {
  return async function createUserAction(req, res) {
    try {
      console.info(`createUserAction :: ${JSON.stringify(req.body)}`);
      const databaseName = req.headers["database-name"];
      console.log(databaseName);
      await validateCreateUserRequest(req);
      await checkUserByEmail({
        databaseName,
        emailAddress: req.body.emailAddress,
      });
      const userId = await createUser({
        databaseName,
        emailAddress: req.body.emailAddress,
        name: req.body.name,
      });
      console.log("userId:", userId);
      // await createDefaultFolders({ databaseName, userId });
      res.send("User created!!");
    } catch (err) {
      console.error(
        `ERROR in createFolderAction controller :: ${err.message}`,
        { stack: err.stack }
      );
      res.send(err.message);
    }
  };
  async function validateCreateUserRequest(req) {
    try {
      const schema = Joi.object({
        name: Joi.string().min(3).required(),
        emailAddress: Joi.string().email().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeCreateUserAction;
