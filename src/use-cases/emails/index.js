const dbs = require("../../data-access").cockroach;
const { OAuth2Client } = require("google-auth-library");
const { google } = require("googleapis");

const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "http://localhost:5000/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const parseMessage = require("./parse-email");
const emailsFoldersAssociation = require("../emails-folders-association");

const makeGetEmailsList = require("./get-emails-list");
const getEmailsList = makeGetEmailsList({ client, google });

const makeInsertEmail = require("./insert-email");
const insertEmail = makeInsertEmail({
  insertEmailIntoDb: dbs.emailsDb.insertEmailIntoDb,
  insertFolderAssociation: emailsFoldersAssociation.insertFolderAssociation,
});

const makeGetEmailBodyHtml = require("./get-email-body-html");
const getEmailBodyHtml = makeGetEmailBodyHtml({
  getEmailBodyHtmlFromDb: dbs.emailsDb.getEmailBodyHtmlFromDb,
});

const makeUpdateEmailBodyHtml = require("./update-email-body-html");
const updateEmailBodyHtml = makeUpdateEmailBodyHtml({
  updateEmailBodyHtmlInDb: dbs.emailsDb.updateEmailBodyHtmlInDb,
  getEmailBodyHtml,
});

const makeFetchEmailDetailsFromProvider = require("./fetch-email-details-from-provider");
const fetchEmailDetailsFromProvider = makeFetchEmailDetailsFromProvider({
  client,
  google,
});
const makeSendEmail = require("./send-email");
const sendEmail = makeSendEmail({ client, google });

const makeGetEmail = require("./get-email");
const getEmail = makeGetEmail({
  getThreadIdFromDb: dbs.emailsDb.getThreadIdFromDb,
  getThreadMailsFromDb: dbs.emailsDb.getThreadMailsFromDb,
});
module.exports = {
  getEmailsList,
  insertEmail,
  parseMessage,
  updateEmailBodyHtml,
  getEmailBodyHtml,
  fetchEmailDetailsFromProvider,
  sendEmail,
  getEmail,
};
