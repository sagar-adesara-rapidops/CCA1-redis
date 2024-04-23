function makeGetEmailsList({ google, client }) {
  return async function getEmailsList({
    accessToken,
    nextPageToken,
    folderName,
  }) {
    console.log("Inside emails list usecase");
    await client.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: "v1", auth: client });
    console.log("FOlder nu naam sagar:::", folderName);
    const res = await gmail.users.messages.list({
      userId: "me",
      q: "newer_than:30d",
      labelIds: folderName,
      // maxResults: 1,
      pageToken: nextPageToken,
    });
    console.log("RESPONSE FROM API CALL (LIST)::::", res);
    console.log(
      "RESPONSE FROM API CALL (LIST):::: messages:::",
      res.data.messages
    );
    res.data.messages?.forEach((message) => {
      console.log("MESSAGE ID:::::::::", message.id, ":::", message.threadId);
    });
    return res.data;
  };
}
module.exports = makeGetEmailsList;
