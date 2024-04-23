function makeDisplayUser({ displayUserFromRedis, displayUserFromDb }) {
  return async function displayUser({ databaseName, userId }) {
    try {
      let result;
      console.log("condition", await displayUserFromRedis({ userId }));
      if (Object.keys(await displayUserFromRedis({ userId })).length != 0) {
        result = await displayUserFromRedis({ userId });
        console.log("redis no data", typeof result, "::::", result);
      } else {
        console.log("Else block");
        result = await displayUserFromDb({ databaseName, userId });
      }
      // result = await displayUserFromDb({ databaseName, userId });
      return result;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = makeDisplayUser;
