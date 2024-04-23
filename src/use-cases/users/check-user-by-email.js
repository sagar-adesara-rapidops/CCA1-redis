function makeCheckUserByEmail({ Joi, selectuserByEmailFromDb }) {
  return async function checkUserByEmail({ databaseName, emailAddress }) {
    try {
      // let emailAddress = userData.emailAddress;
      await validateCheckUserByEmailRequest({ emailAddress });

      let [result, fields] = await selectuserByEmailFromDb({
        databaseName,
        emailAddress,
      });
      if (result.length) {
        throw new Error("User Already exists");
      }
    } catch (err) {
      throw err;
    }
  };
  async function validateCheckUserByEmailRequest({ emailAddress }) {
    try {
      const schema = Joi.object({
        emailAddress: Joi.string().email().required(),
      });
      const { error } = schema.validate({ emailAddress });
      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeCheckUserByEmail;
