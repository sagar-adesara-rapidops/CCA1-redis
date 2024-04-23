module.exports = function makeFetchFoldersFromProvider({
  client,
  google,
  createFolder,
}) {
  return async function fetchFoldersFromProvider({
    userId,
    databaseName,
    accessToken,
  }) {
    try {
      // console.log("userId", userId);
      await client.setCredentials({ access_token: accessToken });
      const gmail = google.gmail({ version: "v1", auth: client });
      const res = await gmail.users.labels.list({
        userId: "me",
      });
      const labels = res.data.labels;
      // console.log("LABELS::::::::::", labels);
      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        let priority = await getPriorityOfFolder({ folderName: label.name });
        let syncState = "STAND BY";
        if (
          label.name == "TRASH" ||
          label.name == "DRAFT" ||
          label.name == "SPAM"
        ) {
          syncState = "FETCHED";
        }
        // console.log(`- ${label.name} (${label.id})`);
        console.log("fetch fold frm provider js file, PRIOIRTY::", priority);
        const result = await createFolder({
          databaseName,
          folderName: label.name,
          providerId: label.id,
          userId,
          priority,
          nextPageToken: null,
          syncState,
        });
        console.log(result);
      }
    } catch (error) {
      console.error(error);
      // res.status(400).send("server error");
    }
  };
  async function getPriorityOfFolder({ folderName }) {
    let priority;
    switch (folderName) {
      case "INBOX":
        priority = 1;
        break;
      case "SENT":
        priority = 2;
        break;
      case "OUTBOX":
        priority = 3;
        break;
      case "STARRED":
        priority = 4;
        break;
      case "IMPORTANT":
        priority = 5;
        break;
      case "TRASH":
        priority = 0;
        break;
      case "DRAFT":
        priority = 0;
        break;
      case "SPAM":
        priority = 0;
        break;
      default:
        priority = 99;
        break;
    }
    return priority;
  }
};
