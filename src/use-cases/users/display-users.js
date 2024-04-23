function makeDisplayUsers({ displayUsersFromDb }) {
  return async function displayUsers({ databaseName }) {
    try {
      let [result, fields] = await displayUsersFromDb({ databaseName });
      return result;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = makeDisplayUsers;
