function makeDeleteUser({ Joi, deleteUserFromDb, checkUserById }) {
  return async function deleteUsers({ databaseName, userId }) {
    try {
      await validateDeleteUserRequest({ userId });
      await checkUserById({ databaseName, userId });

      await deleteUserFromDb({ databaseName, userId });
    } catch (err) {
      throw err;
    }
  };
  async function validateDeleteUserRequest({ userId }) {
    const schema = Joi.object({
      userId: Joi.required(),
    });
    const { error } = schema.validate({ userId });
    if (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = makeDeleteUser;
