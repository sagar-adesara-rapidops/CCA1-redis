function makeCreateUser({
  createDefaultFolders,
  createUserInDb,
  checkUserByEmail,
  Joi,
  kafka,
  insertUserIntoRedis,
}) {
  return async function createUser({
    name,
    emailAddress,
    databaseName,
    accessToken,
    refreshToken,
    expiryDate,
  }) {
    try {
      console.log("EXPIRYDATE inside usecase of create user:", expiryDate);
      // console.info(`createUser :: ${JSON.stringify(name, emailAddress)}`);
      await validateCreateUserRequest({ name, emailAddress });
      await checkUserByEmail({ databaseName, emailAddress });

      let [result, fields] = await createUserInDb({
        databaseName,
        emailAddress,
        name,
        accessToken,
        refreshToken,
        expiryDate,
      });
      const userId = result.insertId;
      console.log("RESULT of create user", result);

      insertUserIntoRedis({
        userId,
        databaseName,
        emailAddress,
        name,
        accessToken,
        refreshToken,
        expiryDate,
      });

      kafkaProducerMessageString = JSON.stringify({
        userId,
        databaseName,
        accessToken,
      });
      // await createDefaultFolders({ databaseName, userId: result.insertId });
      kafka.kafkaProducer({
        databaseName,
        userId,
        topic: "userCreated",
        message: kafkaProducerMessageString,
      });
      // kafkaRun({ userId, producer, databaseName, accessToken });
      return userId;
    } catch (err) {
      // console.error(`ERROR in createFolder useCase :: ${err.message}`, {
      // stack: err.stack,
      // });
      throw err;
    }
  };
  async function kafkaRun({ userId, producer, databaseName, accessToken }) {}
  async function validateCreateUserRequest({ name, emailAddress }) {
    try {
      const schema = Joi.object({
        name: Joi.string().min(3).required(),
        emailAddress: Joi.string().email().required(),
      });
      const { error } = schema.validate({ name, emailAddress });
      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeCreateUser;
