function makeGetExpiryDate({ displayUsersFromDb }) {
  return async function getExpiryDate({ databaseName }) {
    try {
      let [result, fields] = await displayUsersFromDb({ databaseName });
      return result;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = makeGetExpiryDate;
