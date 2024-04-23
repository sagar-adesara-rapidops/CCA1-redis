function makeEmailSendAction({ kafkaProducer }) {
  return async function emailSendAction(req, res) {
    try {
      let accessToken = req.headers.authorization;
      const database = req.headers.database;
      const match = accessToken.match(/^(Bearer )(.+)$/);
      if (match) {
        const bearer = match[1];
        accessToken = match[2];

        const value = JSON.stringify({
          accessToken: accessToken,
          database: database,
          requestBody: req.body,
        });
        await kafkaProducer({ topic: "emailCreated", message: value });
      }
    } catch (error) {
      console.error(`Error :: ${error}`);
      throw error;
      return res.status(400).json({ error: error });
    }
  };
}

module.exports = makeEmailSendAction;
