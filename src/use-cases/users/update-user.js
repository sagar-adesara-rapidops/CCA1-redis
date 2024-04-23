function makeUpdateUser({
  Joi,
  checkUserById,
  updateUserInDb,
  displayUser,
  insertUserIntoRedis,
}) {
  return async function updateUser({ databaseName, newName, userId }) {
    try {
      console.log(
        "UseCase inputs: userId:",
        userId,
        "type:",
        typeof userId,
        "newName:",
        newName,
        "type:",
        typeof newName
      );
      await validateUpdateUserRequest({ newName, userId });
      await checkUserById({ databaseName, userId });
      await updateUserInDb({ databaseName, newName, userId });
      const result = await displayUser({ databaseName, userId });
      console.log("UPDATION mate nu res::", result);
      await insertUserIntoRedis({
        userId: result[0].user_id,
        emailAddress: result[0].email_address,
        accessToken: result[0].access_token,
        refreshToken: result[0].refresh_token,
        name: result[0].name,
        expiryDate: result[0].expiry_date,
      });
      // await displayUserFromRedis({ userId });
    } catch (err) {
      console.log("Error in update controller", err);
      throw err;
    }
  };
  async function validateUpdateUserRequest({ newName, userId }) {
    try {
      console.log(
        "Validate request:",
        userId,
        typeof userId,
        newName,
        typeof newName
      );
      const schema = Joi.object({
        newName: Joi.string().min(3).required(),
        userId: Joi.required(),
      });
      const { error } = schema.validate({ newName, userId });
      if (error) {
        console.log("Error from JOI: ", error);
        throw new Error(error.message);
      }
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeUpdateUser;
