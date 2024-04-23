function makeGetEmailAction({ getEmail }) {
  return async function getEmailAction(req, res) {
    try {
      const emailId = req.params.mailId;
      const databaseName = req.headers["database-name"];
      const result = await getEmail({ databaseName, emailId });
      return result;
    } catch (err) {
      console.error(`ERROR in getEmailAction controller :: ${err.message}`, {
        stack: err.stack,
      });
      res.send(err.message);
    }
  };
}
module.exports = makeGetEmailAction;
