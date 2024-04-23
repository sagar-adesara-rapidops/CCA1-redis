const { Kafka } = require("kafkajs");
const useCases = require("../use-cases");

// const { OAuth2Client } = require("google-auth-library");
// const { google } = require("googleapis");

// const CLIENT_ID =""
// const CLIENT_SECRET = "";
// const REDIRECT_URI = "http://localhost:5000/auth/google/callback";

// const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "fetch-email-details" });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "listFetched", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("FETCH EMAIL DETAILS FILE :: reached each msg function");
      const {
        userId,
        databaseName,
        accessToken,
        id,
        threadId,
        nextPageToken,
        folderName,
        folderId,
      } = await JSON.parse(message.value.toString());

      console.log("MESSAGE inside fetch email Details handlers", {
        userId,
        databaseName,
        accessToken,
        id,
        threadId,
        nextPageToken,
        folderName,
        folderId,
      });

      if (nextPageToken) {
        console.log("REENQUEUE 1", nextPageToken);
        await useCases.kafka.kafkaProducer({
          topic: "foldersCreated",
          message: JSON.stringify({
            userId,
            databaseName,
            accessToken,
            id,
            threadId,
            nextPageToken,
          }),
        });
      }

      const res = await useCases.emails.fetchEmailDetailsFromProvider({
        accessToken,
        id,
      });
      console.log("RES DATAAAA::::", res.data);
      const parsedEmail = await useCases.emails.parseMessage(res.data);
      console.log(
        "LABELIDSSSS",
        parsedEmail,
        "TYPEOF LLABELS",
        typeof parsedEmail.labelIds
      );
      const isRead = parsedEmail.labelIds.includes("UNREAD") ? false : true;
      const snippet = parsedEmail.snippet;
      const historyId = parsedEmail.historyId;
      const createdAt = parsedEmail.internalDate;
      const from = parsedEmail.headers.from;
      const emailSubject = parsedEmail.headers.subject;
      const to = parsedEmail.headers.to;
      const cc = parsedEmail.headers.cc;
      const bcc = parsedEmail.headers.bcc;
      const emailBodyText = parsedEmail.textPlain;
      const emailBodyHtml = parsedEmail.textHtml;
      const imid = id;
      const inReplyTo = parsedEmail.headers["in-reply-to"];
      const scheduledAt = "2023/01/01";
      const isArchive = checkArchive({ labels: parsedEmail.labelIds });
      const isTrashed = parsedEmail.labelIds.includes("TRASH") ? true : false;

      // console.log("EMAIL BODY TXT:", emailBodyText);
      function checkArchive({ labels }) {
        if ((labels.length = 2)) {
          if (labels.includes("UNREAD")) {
            return true;
          } else {
            return false;
          }
        } else if ((labels.length = 1)) {
          return true;
        } else {
          return false;
        }
      }
      console.log("PARSED EMAIL:", parsedEmail);
      const result = await useCases.emails.insertEmail({
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
      });

      // console.log("RESULTTTTT", result);
      // console.log("********threadId**********:::", res.data.threadId);
      // console.log("********msgId**********:::", res.data.id);
      // console.log("********labelIds**********:::", res.data.labelIds);
      // console.log("********snippet**********:::", res.data.snippet);
      // console.log("********headers**********:::", res.data.payload.headers);
      // console.log("********body**********:::", res.data.payload.body);
      // console.log("********parts**********:::", res.data.payload.parts);
      // console.log("********historyId**********:::", res.data.payload.historyId);
      // console.log(
      //   "********internalDate**********:::",
      //   res.data.payload.internalDate
      // );
      // console.log("AKHO RESPONSE:::", res);

      const EmailRegex = /(?<=<)[^>]+(?=>)|\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g;
      console.log("TO ni upr:::::", parsedEmail);
      if (to) {
        let toMatches = to.match(EmailRegex);
        // console.log("MATCHESSSSSSSS", toMatches);
        for (let i = 0; i < toMatches.length; i++) {
          await useCases.recipients.insertRecipeints({
            databaseName,
            emailId: result.rows[0].email_id,
            recipientEmailAddress: toMatches[i],
            type: "to",
          });
        }
      }
      console.log("CC ni upr:::::", parsedEmail);

      if (cc) {
        let ccMatches = cc.match(EmailRegex);

        for (let i = 0; i < ccMatches.length; i++) {
          await useCases.recipients.insertRecipeints({
            databaseName,
            emailId: result.rows[0].email_id,
            recipientEmailAddress: ccMatches[i],
            type: "cc",
          });
        }
      }
      console.log("BCC ni upr:::::", parsedEmail);

      if (bcc) {
        let bccMatches = bcc.match(EmailRegex);

        for (let i = 0; i < bccMatches.length; i++) {
          await useCases.recipients.insertRecipeints({
            databaseName,
            emailId: result.rows[0].email_id,
            recipientEmailAddress: bccMatches[i],
            type: "cc",
          });
        }
      }
      console.log("FROM ni upr", parsedEmail);
      await useCases.recipients.insertRecipeints({
        databaseName,
        emailId: result.rows[0].email_id,
        recipientEmailAddress: from,
        type: "from",
      });
      console.log("ATTCH ni upr");
      const attachments = parsedEmail?.attachments;
      if (attachments) {
        for (let attachment of attachments) {
          fileName = attachment.filename;
          console.log("ATTACHMENT NO HEADER", attachment.headers);
          // console.log("AKHU ATTACHMENT", attachment);
          // const mimeType = attachment.mimeType;
          // const size = attachment.size;

          const attachmentPath = await useCases.attachments.insertAttachment({
            databaseName,
            attachmentId: attachment.attachmentId,
            messageId: id,
            fileName,
            accessToken,
            emailId: result.rows[0].email_id,
          });
          // console.log("ATCHMNT NO PATH", attachmentPath);
          // console.log("KONTENT ID", attachment.headers["x-attachment-id"]);
          if (attachment.headers["content-disposition"].includes("inline")) {
            await useCases.emails.updateEmailBodyHtml({
              databaseName,
              attachmentPath,
              contentId: attachment.headers["x-attachment-id"],
              emailId: result.rows[0].email_id,
            });
          }
        }
      }
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);

//, scheduledAt
// historyId nakhvi k nai?
