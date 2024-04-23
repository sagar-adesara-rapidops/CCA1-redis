function makeDisplayFolders({ Joi, displayFoldersFromDb }) {
  return async function displayFolders({ databaseName, userId }) {
    try {
      await validateDisplayFoldersRequest({ userId });

      let [result, fields] = await displayFoldersFromDb({
        databaseName,
        userId,
      });
      return result;
    } catch (err) {
      throw err;
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
module.exports = makeDisplayFolders;
