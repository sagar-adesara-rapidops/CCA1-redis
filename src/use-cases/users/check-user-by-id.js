function makeCheckUserById({ Joi, selectuserByIdFromDb }) {
  return async function checkUserById({ databaseName, userId }) {
    try {
      // let emailAddress = userData.emailAddress;
      await validateCheckUserByIdRequest({ userId });

      let [result, fields] = await selectuserByIdFromDb({
        databaseName,
        userId,
      });
      console.log("RESULT of check usr by id", result.length);
      console.log("USER ID chk usr by id useccase::::::: ", userId);
      if (!result.length) {
        throw new Error("User doesn't exist");
      }
    } catch (err) {
      throw err;
    }
  };
  async function validateCheckUserByIdRequest({ userId }) {
    try {
      const schema = Joi.object({
        userId: Joi.required(),
      });
      const { error } = schema.validate({ userId });
      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeCheckUserById;
