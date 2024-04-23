function makeDisplayUsersAction({ displayUsers }) {
  return async function displayUsersAction(req, res) {
    try {
      console.info(`displayUsersAction ::`);
      const databaseName = req.headers["database-name"];

      const users = await displayUsers({ databaseName });
      res.send(users);
    } catch (err) {
      console.error(
        `ERROR in createFolderAction controller :: ${err.message}`,
        { stack: err.stack }
      );
      res.send(err.message);
    }
  };
}
module.exports = makeDisplayUsersAction;
