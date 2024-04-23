// displayUserAction;
function makeDisplayUserAction({ displayUser }) {
  return async function displayUserAction(req, res) {
    try {
      console.info(`displayUserAction ::`);
      const databaseName = req.headers["database-name"];
      const userId = req.params.userId;
      const user = await displayUser({ databaseName, userId });
      res.send(user);
    } catch (err) {
      console.error(`ERROR in displayUserAction controller :: ${err.message}`, {
        stack: err.stack,
      });
      res.send(err.message);
    }
  };
}
module.exports = makeDisplayUserAction;
