function makeRedisStore({ client }) {
  return { insertUserIntoRedis, displayUserFromRedis };
  async function insertUserIntoRedis({
    userId,
    // databaseName,
    emailAddress,
    name,
    accessToken,
    refreshToken,
    expiryDate,
  }) {
    try {
      console.log("Inside REDIS query", client);
      await client.hSet(userId, {
        // databaseName,
        emailAddress,
        name,
        accessToken,
        refreshToken,
        expiryDate,
      });
      console.log("Done redis insert");
    } catch (err) {
      console.log("Redis insert err:", err);
      throw err;
    }
  }
  async function displayUserFromRedis({ userId }) {
    try {
      console.log("Inside REDIS query");
      const result = await client.hGetAll(userId);
      console.log("Done redis display");
      return result;
    } catch (err) {
      console.log("Redis display err:", err);
      throw err;
    }
  }
}
module.exports = makeRedisStore;
