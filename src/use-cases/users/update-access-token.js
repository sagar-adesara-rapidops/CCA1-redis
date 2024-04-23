// accessToken,
//               databaseName,
//               // userId
function makeUpdateAccessToken({ updateAccessTokenInDb }) {
  return async function updateAccessToken({
    accessToken,
    databaseName,
    userId,
    expiryDate,
  }) {
    try {
      let [result, fields] = await updateAccessTokenInDb({
        accessToken,
        databaseName,
        userId,
        expiryDate,
      });
      // return result;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = makeUpdateAccessToken;
