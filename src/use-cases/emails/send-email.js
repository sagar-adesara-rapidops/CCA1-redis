function makeSendEmail({ client, google }) {
  return async function sendEmail({ accessToken, database, requestBody }) {
    try {
      client.setCredentials({ access_token: accessToken });
      const gmail = google.gmail({ version: "v1", auth: client });

      const message = requestBody;
      //   const encodedMessage = Buffer.from(message).toString("base64");
      const res = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: Buffer.from(createMessage(message)).toString("base64"),
        },
      });

      console.log("Message sent!", res.data);
    } catch (error) {
      console.error(`Error :: ${error}`);
      throw error;
      return res.status(400).json({ error: error });
    }
  };
}
// create a message object
const createMessage = (message) => {
  // convert message payload to RFC 2822 formatted message
  let to, cc, bcc;
  if (message.to.length !== 0) {
    to = `To: ${message.to
      .map((to) => `${to.name} <${to.email}>`)
      .join(",")}\n`;
  }
  if (message.cc.length !== 0) {
    cc = `Cc: ${message.cc
      .map((cc) => `${cc.name} <${cc.email}>`)
      .join(",")}\n`;
  }
  if (message.bcc.length !== 0) {
    bcc = `Bcc: ${message.bcc
      .map((bcc) => `${bcc.name} <${bcc.email}>`)
      .join(",")}\n`;
  }
  console.log(to, " to");
  const rfcMessage = [
    to,
    `Subject: ${message.subject}`,
    `Content-Type: multipart/mixed; boundary="boundary-example"`,
    "",
    "--boundary-example",
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: 7bit`,
    "",
    message.plainText,
    "",
    "--boundary-example",
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: 7bit`,
    "",
    message.htmlText,
    "",
  ];
  // add attachments if present
  //   if (message.attachments !== 0) {
  //     message.attachments.forEach(attachment => {
  //       rfcMessage.push('--boundary-example');
  //       rfcMessage.push(`Content-Type: ${attachment.type}; charset=UTF-8`);
  //       rfcMessage.push(`Content-Disposition: attachment; filename="${attachment.filename}"`);
  //       rfcMessage.push(`Content-Transfer-Encoding: base64`);
  //       rfcMessage.push('');
  //       rfcMessage.push(attachment.data);
  //       rfcMessage.push('');
  //     });
  //   }

  // add message end boundary
  rfcMessage.push("--boundary-example--");

  // join all lines of the message array with line breaks
  return rfcMessage.join("\n");
};

module.exports = makeSendEmail;
