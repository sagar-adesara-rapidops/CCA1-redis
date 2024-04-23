// getExpiringSoonUsersRefreshTokenFromDb;
function makeGetExpiringSoonUsersRefreshToken({
  getExpiringSoonUsersRefreshTokenFromDb,
}) {
  return async function getExpiringSoonUsersRefreshToken({
    databaseName,
    soonToExpireTime,
  }) {
    try {
      let [result, fields] = await getExpiringSoonUsersRefreshTokenFromDb({
        databaseName,
        soonToExpireTime,
      });
      return result;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = makeGetExpiringSoonUsersRefreshToken;
