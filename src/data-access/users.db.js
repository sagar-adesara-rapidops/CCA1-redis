function makeUsersDb({ mysql }) {
  return {
    createUserInDb,
    selectuserByEmailFromDb,
    selectuserByIdFromDb,
    displayUsersFromDb,
    deleteUserFromDb,
    updateUserInDb,
  };
  async function createUserInDb({ databaseName, emailAddress, name }) {
    try {
      console.log("Inside sql query of cereate user (dataaccess)");
      let [result, fields] = await mysql.execute(
        `INSERT INTO ${databaseName}.users (emailAddress, accessToken,refreshToken,name)
    VALUES(?, 'sampleAccess', "sampleRefresh", ?);`,
        [emailAddress, name]
      );
      return [result, fields];
    } catch (err) {
      throw err;
    }
  }

  async function selectuserByEmailFromDb({ databaseName, emailAddress }) {
    try {
      let [result, fields] = await mysql.execute(
        `SELECT * FROM ${databaseName}.users WHERE emailAddress = ?`,
        [emailAddress]
      );
      return [result, fields];
    } catch (err) {
      throw err;
    }
  }

  async function selectuserByIdFromDb({ databaseName, userId }) {
    try {
      let [result, fields] = await mysql.execute(
        `SELECT userId FROM ${databaseName}.users WHERE userId = ?`,
        [userId]
      );
      return [result, fields];
    } catch (err) {
      throw err;
    }
  }

  async function displayUsersFromDb({ databaseName }) {
    try {
      let [result, fields] = await mysql.execute(
        `SELECT name,emailAddress FROM ${databaseName}.users`
      );
      return [result, fields];
    } catch (err) {
      throw err;
    }
  }
  async function deleteUserFromDb({ databaseName, userId }) {
    try {
      let [result, fields] = await mysql.execute(
        `DELETE FROM ${databaseName}.users WHERE userId = ?`,
        [userId]
      );
    } catch (err) {
      throw err;
    }
  }
  async function updateUserInDb({ databaseName, newName, userId }) {
    try {
      let [result, fields] = await mysql.execute(
        `UPDATE  ${databaseName}.users SET name = ? where userId = ?`,
        [newName, userId]
      );
    } catch (err) {
      throw err;
    }
  }
}
module.exports = makeUsersDb;
