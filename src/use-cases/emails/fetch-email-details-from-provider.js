module.exports = function makeFetchEmailDetailsFromProvider({
  client,
  google,
  // createFolder,
}) {
  return async function fetchEmailDetailsFromProvider({ accessToken, id }) {
    try {
      await client.setCredentials({ access_token: accessToken });
      const gmail = google.gmail({ version: "v1", auth: client });
      const res = await gmail.users.messages.get({
        userId: "me",
        id,
        format: "full",

        // q: "after:2023/4/5 before:2023/4/20",
      });
      return res;
    } catch (error) {
      console.error(error);
      // res.status(400).send("server error");
    }
  };
};
