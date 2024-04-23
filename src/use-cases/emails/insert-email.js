function makeInsertEmail({ insertEmailIntoDb, insertFolderAssociation }) {
  return async function insertEmail({
    databaseName,
    emailSubject,
    emailBodyText,
    emailBodyHtml,
    threadId,
    createdAt,
    userId,
    isRead,
    imid,
    inReplyTo,
    scheduledAt,
    snippet,
    isArchive,
    isTrashed,
    folderId,
  }) {
    console.log("Inside Insert Email usecase");
    // await client.setCredentials({ access_token: accessToken });
    // const gmail = google.gmail({ version: "v1", auth: client });
    // const res = await gmail.users.messages.list({
    // userId: "me",
    // // q: "after:2023/4/5 before:2023/4/20",
    // maxResults: 1,
    // });
    const result = await insertEmailIntoDb({
      databaseName,
      emailSubject,
      emailBodyText,
      emailBodyHtml,
      threadId,
      createdAt,
      userId,
      isRead,
      imid,
      inReplyTo,
      scheduledAt,
      snippet,
      isArchive,
      isTrashed,
    });
    console.log("RESPOnse from insert Email USECASE)::::", result);

    await insertFolderAssociation({
      databaseName,
      emailId: result.rows[0].email_id,
      folderId,
    });

    return result;
  };
}
module.exports = makeInsertEmail;
