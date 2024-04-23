module.exports = function makeInsertAttachment({
  client,
  google,
  fs,
  insertAttachmentIntoDb,
  path,
}) {
  return async function insertAttachment({
    databaseName,
    attachmentId,
    messageId,
    fileName,
    accessToken,
    emailId,
  }) {
    client.setCredentials({
      access_token: accessToken,
    });

    const gmail = google.gmail({ version: "v1", auth: client });

    const attachmentData = await gmail.users.messages.attachments.get({
      userId: "me",
      messageId: messageId,
      id: attachmentId,
    });
    console.log(`Downloading attachment ${fileName}`);
    console.log("data", attachmentData);
    const data = attachmentData.data;
    const size = attachmentData.data.size;
    const buffer = Buffer.from(data.data, "base64");

    const attachmentPath = path.join(__dirname, "../../public", fileName);
    console.log("ATTACHMNT PATHH:::::", attachmentPath);
    await insertAttachmentIntoDb({
      databaseName,
      attachmentPath,
      emailId,
      fileName,
      size,
    });
    fs.writeFile(attachmentPath, buffer, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Attachment stored in ${attachmentPath}`);
    });
    return attachmentPath;
  };
};
